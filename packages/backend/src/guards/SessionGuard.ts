import type { NextFunction, Request, Response } from "express";
import { CacheService } from "../services/CacheService";
import { SessionProvider } from "../providers/SessionProvider";

const SessionGuard = () => {
	return {
		isAuthenticated: async (
			request: Request,
			response: Response,
			next: NextFunction,
		) => {
			const session = SessionProvider(request, response).getSession();

			if (session && session.sid !== undefined) {
				const { findOnCache, removeFromCache } = CacheService();
				const foundSession = await findOnCache(`session:${session.sid}`);

				if (foundSession && Date.now() <= foundSession.expiresIn) {
					return void next();
				}

				await removeFromCache(`session:${session.sid}`);
			}

			return void response.status(401).json();
		},
		isAuthenticating: async (
			request: Request,
			response: Response,
			next: NextFunction,
		) => {
			const session = SessionProvider(request, response).getSession();

			if (session && session.sid !== undefined) {
				const { findOnCache, removeFromCache } = CacheService();
				const foundSession = await findOnCache(`session:${session.sid}`);

				if (foundSession && Date.now() <= foundSession.expiresIn) {
					return void response.status(409).json();
				}

				await removeFromCache(`session:${session.sid}`);
			}

			return void next();
		},
	};
};

export { SessionGuard };
