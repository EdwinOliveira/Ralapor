import type { NextFunction, Request, Response } from "express";
import { CacheService } from "../services/CacheService";
import { SessionProvider } from "../providers/SessionProvider";
import { TokenProvider } from "../providers/TokenProvider";

const SessionGuard = () => {
	return {
		isAuthenticated: async (
			request: Request,
			response: Response,
			next: NextFunction,
		) => {
			const { getSession, clearSession } = SessionProvider(request, response);
			const session = getSession();

			if (session && session.sid !== undefined) {
				const { findOnCache, removeFromCache } = CacheService();
				const foundSession = await findOnCache(`session:${session.sid}`);

				console.log(foundSession);

				if (foundSession && Date.now() <= foundSession.expiresIn) {
					const { checkToken } = TokenProvider();

					const tokenData = await checkToken(
						foundSession.refreshToken,
						process.env.SESSION_TOKEN_SECRET,
					);

					if (tokenData !== undefined) {
						return void next();
					}
				}

				await removeFromCache(`session:${session.sid}`);
				clearSession();
			}

			return void response.status(401).json();
		},
		isAuthenticating: async (
			request: Request,
			response: Response,
			next: NextFunction,
		) => {
			const { getSession, clearSession } = SessionProvider(request, response);
			const session = getSession();

			if (session && session.sid !== undefined) {
				const { findOnCache, removeFromCache } = CacheService();
				const foundSession = await findOnCache(`session:${session.sid}`);

				if (foundSession && Date.now() <= foundSession.expiresIn) {
					return void response.status(409).json();
				}

				await removeFromCache(`session:${session.sid}`);
				clearSession();
			}

			return void next();
		},
	};
};

export { SessionGuard };
