import Express, { json, Router } from "express";
import cors from "cors";
import "dotenv/config";
import { UserRouter } from "./routers/UserRouter";
import { RoleRouter } from "./routers/RoleRouter";
import { HashProvider } from "./providers/HashProvider";
import { MailProvider } from "./providers/MailProvider";
import { RandomProvider } from "./providers/RandomProvider";
import { DatabaseService } from "./services/DatabaseService";
import type { Context } from "./signatures/Context";

const BackendApplication = () => {
	const httpApplication = Express();
	const httpAddress = Number.parseInt(process.env.SERVER_PORT ?? "8000");
	const context: Context = {
		providers: {
			hashProvider: HashProvider(),
			mailProvider: MailProvider(),
			randomProvider: RandomProvider(),
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

	const createRoutes = async () => {
		const userRouter = UserRouter().subscribe(Router(), context);
		httpApplication.use("/users", userRouter);

		const roleRouter = RoleRouter().subscribe(Router(), context);
		httpApplication.use("/roles", roleRouter);
	};

	const createListner = () => {
		httpApplication.listen(httpAddress, async () => {
			const {
				createConnection,
				createRolesTable,
				createUsersTable,
				destroyConnection,
			} = context.services.databaseService;
			const connection = createConnection();

			try {
				await createUsersTable(connection);
				await createRolesTable(connection);
			} finally {
				await destroyConnection(connection);
			}

			console.log(`Server initialized on PORT:${httpAddress}!`);
		});
	};

	return {
		createMiddleware,
		createRoutes,
		createListner,
	};
};

const { createMiddleware, createRoutes, createListner } = BackendApplication();

createMiddleware();
createRoutes();
createListner();
