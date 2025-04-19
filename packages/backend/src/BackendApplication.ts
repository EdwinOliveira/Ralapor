import Express, { json, Router } from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import type { UserEntity } from "./domains/User";
import { UserRouter } from "./routers/UserRouter";

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

	const createRoutes = () => {
		httpApplication.use("/users", UserRouter().subscribe(Router()));
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
