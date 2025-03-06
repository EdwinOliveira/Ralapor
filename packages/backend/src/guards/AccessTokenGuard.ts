import type { NextFunction, Request, Response } from "express";
import { TokenProvider } from "../providers/TokenProvider";

const AccessTokenGuard = (
	request: Request,
	response: Response,
	next: NextFunction,
) => {
	try {
		const authorizationToken = request.headers.authorization?.split(" ")[1];

		if (authorizationToken) {
			const { checkToken } = TokenProvider();
			checkToken(authorizationToken, process.env.REFRESH_TOKEN_SECRET);
			return next();
		}

		response.status(401).json();
	} catch (error) {
		response.status(500).json(error);
	}
};

export { AccessTokenGuard };
