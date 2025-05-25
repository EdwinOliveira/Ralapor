import Express, { json, Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import type { Context } from "./signatures/Context";
import { UserRouter } from "./routers/UserRouter";
import { RoleRouter } from "./routers/RoleRouter";
import { DatabaseService } from "./services/DatabaseService";
import { SubstanceRouter } from "./routers/SubstanceRouter";

const BackendApplication = () => {
	const httpApplication = Express();
	const httpAddress = Number.parseInt(process.env.SERVER_PORT ?? "8000");

	const createMiddleware = () => {
		httpApplication.use(json());
		httpApplication.use(cookieParser());
		httpApplication.use(
			cors({
				origin: "http://localhost:5173",
				credentials: true,
			}),
		);
	};

	const createRoutes = async () => {
		const userRouter = UserRouter().subscribe(Router());
		httpApplication.use("/users", userRouter);

		const roleRouter = RoleRouter().subscribe(Router());
		httpApplication.use("/roles", roleRouter);

		const substanceRouter = SubstanceRouter().subscribe(Router());
		httpApplication.use("/substances", substanceRouter);
	};

	const createListner = () => {
		httpApplication.listen(httpAddress, async () => {
			const {
				createConnection,
				createUsersTable,
				createRolesTable,
				createRecipesTable,
				createSubstancesTable,
				destroyConnection,
			} = DatabaseService();

			const connection = createConnection();

			try {
				await createUsersTable(connection);
				await createRolesTable(connection);
				await createRecipesTable(connection);
				await createSubstancesTable(connection);
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
