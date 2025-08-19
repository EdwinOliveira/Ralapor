import type { NextFunction, Request, Response } from 'express';

import { CacheDataSource } from '../dataSource/CacheDataSource';
import { SessionProvider } from '../providers/SessionProvider';

const ChallengeGuard = () => {
  return {
    isChallengeCompleted: async (
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const { getSession } = SessionProvider(request, response);
        const session = getSession();

        if (session === undefined || session.sid === undefined) {
          return void response.status(401).json();
        }

        const { findOnCache, isChallengeCache, isSessionCache } =
          CacheDataSource();

        const foundSession = await findOnCache(`session:${session.sid}`);

        if (!isSessionCache(foundSession)) {
          return void response.status(401).json();
        }

        const foundSessionChallenge = await findOnCache(
          `session:${foundSession.sessionId}:challenge`
        );

        if (!isChallengeCache(foundSessionChallenge)) {
          return void response.status(401).json();
        }

        const { isChecked, isRevoked } = foundSessionChallenge;

        if (!isChecked || isRevoked) {
          return void response.status(401).json();
        }

        return void next();
      } catch {
        return void response.status(500).json();
      }
    },
  };
};

export { ChallengeGuard };
