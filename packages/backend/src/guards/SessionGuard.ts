import {
	response,
	type NextFunction,
	type Request,
	type Response,
} from "express";

const SessionGuard = () => {
	const checkAuthentication = (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		if (request.session.user === undefined) {
			response.status(401).json();
			return;
		}

		next();
	};

	const isAuthenticated = (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		if (request.session.user !== undefined) {
			response.status(200).json();
			return;
		}

		next();
	};

	return {
		checkAuthentication,
		isAuthenticated,
	};
};

export { SessionGuard };
