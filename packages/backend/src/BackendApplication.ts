import Express, { json, Router } from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import type { UserEntity } from "./domains/User";
import { UserRouter } from "./routers/UserRouter";
import { RoleRouter } from "./routers/RoleRouter";
import { SessionRouter } from "./routers/SessionRouter";
import { HashProvider } from "./providers/HashProvider";
import { MailProvider } from "./providers/MailProvider";
import { RandomProvider } from "./providers/RandomProvider";
import { SessionProvider } from "./providers/SessionProvider";
import { DatabaseService } from "./services/DatabaseService";
import type { Context } from "./signatures/Context";

declare module "express-session" {
	interface SessionData {
		user: Partial<
			Pick<
				UserEntity,
				"id" | "username" | "email" | "phoneNumber" | "phoneNumberCode"
			>
		>;
	}
}

const BackendApplication = () => {
	const httpApplication = Express();
	const httpAddress = Number.parseInt(process.env.SERVER_PORT ?? "8000");
	const context: Context = {
		providers: {
			hashProvider: HashProvider(),
			mailProvider: MailProvider(),
			randomProvider: RandomProvider(),
			sessionProvider: SessionProvider(),
		},
		services: {
			databaseService: DatabaseService(),
		},
	};

	const createMiddleware = () => {
		httpApplication.use(json());
		httpApplication.use(
			cors({
				origin: "http://localhost:5173",
				credentials: true,
			}),
		);
	};

	const createSession = () => {
		httpApplication.use(
			session({
				secret: process.env.BACKEND_SESSION_SECRET ?? "",
				resave: false,
				saveUninitialized: false,
				cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 },
			}),
		);
	};

	const createRoutes = async () => {
		const userRouter = UserRouter().subscribe(Router(), context);
		httpApplication.use("/users", userRouter);

		const roleRouter = RoleRouter().subscribe(Router(), context);
		httpApplication.use("/roles", roleRouter);

		const sessionRouter = SessionRouter().subscribe(Router(), context);
		httpApplication.use("/sessions", sessionRouter);
	};

	const createListner = () => {
		httpApplication.listen(httpAddress, async () => {
			const {
				createConnection,
				createRolesTable,
				createSessionsTable,
				createUsersTable,
				destroyConnection,
			} = context.services.databaseService;
			const connection = createConnection();

			try {
				await createUsersTable(connection);
				await createRolesTable(connection);
				await createSessionsTable(connection);
			} finally {
				await destroyConnection(connection);
			}

			console.log(`Server initialized on PORT:${httpAddress}!`);
		});
	};

	return {
		createMiddleware,
		createSession,
		createRoutes,
		createListner,
	};
};

const { createMiddleware, createSession, createRoutes, createListner } =
	BackendApplication();

createMiddleware();
createSession();
createRoutes();
createListner();
