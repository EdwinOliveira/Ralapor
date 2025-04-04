import type { NextFunction, Request, Response } from "express";

const SessionGuard = () => {
	const isAuthenticated = (
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

	return {
		isAuthenticated,
	};
};

export { SessionGuard };
