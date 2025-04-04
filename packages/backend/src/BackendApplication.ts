import Express, { json, Router } from "express";
import cors from "cors";
import { BackendRouter } from "./BackendRouter";
import session from "express-session";
import "dotenv/config";
import type { UserEntity } from "./domains/User";

declare module "express-session" {
	interface SessionData {
		users: Array<
			Partial<
				Pick<
					UserEntity,
					"id" | "username" | "email" | "phoneNumber" | "phoneNumberCode"
				>
			>
		>;
	}
}

const BackendApplication = () => {
	const httpApplication = Express();
	const httpAddress = Number.parseInt(process.env.SERVER_PORT ?? "8000");

	const createMiddleware = () => {
		httpApplication.use(json());
		httpApplication.use(cors());
	};

	const createSession = () => {
		httpApplication.use(
			session({
				secret: "BACKEND_SESSION_SECRET",
				resave: false,
				saveUninitialized: false,
				cookie: { httpOnly: true, maxAge: 60000 * 150 },
			}),
		);
	};

	const createRoutes = () => {
		httpApplication.all("*", BackendRouter().subscribe(Router()));
	};

	const createListner = () => {
		httpApplication.listen(httpAddress, () =>
			console.log(`Server initialized on PORT:${httpAddress}!`),
		);
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
