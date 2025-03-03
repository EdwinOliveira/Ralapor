import Express, { json, Router } from "express";
import cors from "cors";
import { BackendRouter } from "./BackendRouter";

const BackendApplication = () => {
	const httpApplication = Express();
	const httpAddress = Number.parseInt(process.env.SERVER_PORT ?? "8000");

	const createMiddleware = () => {
		httpApplication.use(json());
		httpApplication.use(cors());
	};

	const createRoutes = () => {
		httpApplication.all("*", BackendRouter().subscribe(Router()));
	};

	const createListner = () => {
		httpApplication.listen(httpAddress, () =>
			console.log(`Server initialized on PORT:${httpAddress}!`),
		);
	};

	return { createMiddleware, createRoutes, createListner };
};

const { createMiddleware, createRoutes, createListner } = BackendApplication();

createMiddleware();
createRoutes();
createListner();
