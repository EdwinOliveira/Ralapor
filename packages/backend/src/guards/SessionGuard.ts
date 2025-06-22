import type { NextFunction, Request, Response } from "express";
import { RandomProvider } from "../providers/RandomProvider";
import { SessionProvider } from "../providers/SessionProvider";
import { TokenProvider } from "../providers/TokenProvider";
import { CacheDataSource } from "../datasources/CacheDataSource";

const SessionGuard = () => {
  return {
    isAuthenticated: async (
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const { getSession, clearSession } = SessionProvider(request, response);
        const session = getSession();

        if (session && session.sid !== undefined) {
          const {
            findOnCache,
            updateOnCache,
            removeFromCache,
            isSessionCache,
          } = CacheDataSource();
          const foundSession = await findOnCache(`session:${session.sid}`);

          if (isSessionCache(foundSession)) {
            if (Date.now() <= foundSession.expiresIn) {
              return void next();
            }

            const tokenData = await TokenProvider().checkToken(
              foundSession.refreshToken,
              process.env.SESSION_TOKEN_SECRET
            );

            if (tokenData.signature === "TokenSuccess") {
              const { createExpirationTime } = RandomProvider();
              const expirationTime = createExpirationTime();

              await updateOnCache(`session:${foundSession.sessionId}`, {
                sessionId: foundSession.sessionId,
                userId: foundSession.userId,
                roleId: foundSession.roleId,
                expiresIn: expirationTime,
                refreshToken: foundSession.refreshToken,
                deviceUuid: foundSession.deviceUuid,
              });

              return void next();
            }
          }

          await removeFromCache(`session:${session.sid}`);
          clearSession();
        }

        return void response.status(401).json();
      } catch (error) {
        return void response.status(500).json();
      }
    },
    isAuthenticating: async (
      request: Request,
      response: Response,
      next: NextFunction
    ) => {
      try {
        const { getSession, clearSession } = SessionProvider(request, response);
        const session = getSession();

        if (session && session.sid !== undefined) {
          const { findOnCache, removeFromCache, isSessionCache } =
            CacheDataSource();
          const foundSession = await findOnCache(`session:${session.sid}`);

          if (
            isSessionCache(foundSession) &&
            Date.now() <= foundSession.expiresIn
          ) {
            return void response.status(409).json();
          }

          await removeFromCache(`session:${session.sid}`);
          clearSession();
        }

        return void next();
      } catch (error) {
        return void response.status(500).json();
      }
    },
  };
};

export { SessionGuard };
