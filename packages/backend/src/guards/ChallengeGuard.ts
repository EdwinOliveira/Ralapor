import type { NextFunction, Request, Response } from "express";
import { SessionProvider } from "../providers/SessionProvider";
import { CacheService } from "../services/CacheService";

const ChallengeGuard = () => {
	return {
		isChallengeCompleted: async (
			request: Request,
			response: Response,
			next: NextFunction,
		) => {
			try {
				const { getSession } = SessionProvider(request, response);
				const session = getSession();

				if (session === undefined || session.sid === undefined) {
					return void response.status(401).json();
				}

				const { findOnCache, isSessionCache, isChallengeCache } =
					CacheService();

				const foundSession = await findOnCache(`session:${session.sid}`);

				if (!isSessionCache(foundSession)) {
					return void response.status(401).json();
				}

				const foundSessionChallenge = await findOnCache(
					`session:${foundSession.sessionId}:challenge`,
				);

				if (!isChallengeCache(foundSessionChallenge)) {
					return void response.status(401).json();
				}

				const { isChecked, isRevoked } = foundSessionChallenge;

				if (!isChecked || isRevoked) {
					return void response.status(401).json();
				}

				return void next();
			} catch (error) {
				return void response.status(500).json();
			}
		},
	};
};

export { ChallengeGuard };
