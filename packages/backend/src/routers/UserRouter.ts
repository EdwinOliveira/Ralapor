import type { Request, Response, Router } from 'express';

import { CacheDataSource } from '../dataSource/CacheDataSource';
import {
  createUserSchema,
  createUserSessionChallengeSchema,
  createUserSessionSchema,
  deleteUserSessionByIdSchema,
  findUserByIdSchema,
  updateUserAccessCodeByIdSchema,
  updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema,
  updateUserByIdSchema,
  updateUserSessionChallengeIsCheckedSchema,
  updateUserSessionChallengeIsRevokedSchema,
} from '../domains/User';
import { ChallengeGuard } from '../guards/ChallengeGuard';
import { SessionGuard } from '../guards/SessionGuard';
import { RandomProvider } from '../providers/RandomProvider';
import { RateLimitProvider } from '../providers/RateLimitProvider';
import { SessionProvider } from '../providers/SessionProvider';
import { TokenProvider } from '../providers/TokenProvider';
import { CreateUserSessionUseCase } from '../useCases/users/CreateUserSessionUseCase';
import { CreateUserUseCase } from '../useCases/users/CreateUserUseCase';
import { DeleteUserSessionByIdUseCase } from '../useCases/users/DeleteUserSessionByIdUseCase';
import { FindUserByIdUseCase } from '../useCases/users/FindUserByIdUseCase';
import { UpdateUserAccessCodeByIdUseCase } from '../useCases/users/UpdateUserAccessCodeByIdUseCase';
import { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase } from '../useCases/users/UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase';
import { UpdateUserByIdUseCase } from '../useCases/users/UpdateUserByIdUseCase';

const UserRouter = () => {
  const { isAuthenticated, isAuthenticating } = SessionGuard();
  const { isChallengeCompleted } = ChallengeGuard();
  const { createRateLimit } = RateLimitProvider();

  const subscribe = (router: Router): Router => {
    /**
     * MFA
     */

    router.post(
      '/:id/session/challenge',
      isAuthenticating,
      createRateLimit(15 * 60 * 1000, 5),
      async (request: Request, response: Response) => {
        const { error: schemaErrors } =
          createUserSessionChallengeSchema.safeParse({ body: request.body });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { getSession } = SessionProvider(request, response);
        const { addToCache, findOnCache, isSessionCache } = CacheDataSource();
        const { createChallengeExpirationTime, createRandomString } =
          RandomProvider();

        const cachedSession = getSession();

        if (cachedSession?.sid === undefined) {
          return void response.status(500).json();
        }

        const foundSession = await findOnCache(`session:${cachedSession.sid}`);

        if (!isSessionCache(foundSession)) {
          return void response.status(500).json();
        }

        await addToCache(`session:${foundSession.sessionId}:challenge`, {
          code: createRandomString(4),
          expiresIn: createChallengeExpirationTime(),
          isChecked: false,
          isRevoked: false,
        });

        // TODO: Send Challenge Code To Client By Email or Phone Number

        return void response.status(201).json();
      }
    );

    router.put(
      '/:id/session/challenge/is-checked',
      isAuthenticated,
      createRateLimit(15 * 60 * 1000, 5),
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          updateUserSessionChallengeIsCheckedSchema.safeParse({
            body: request.body,
            params: request.params,
          });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { getSession } = SessionProvider(request, response);
        const { findOnCache, isChallengeCache, isSessionCache, updateOnCache } =
          CacheDataSource();

        const cachedSession = getSession();

        if (cachedSession?.sid === undefined) {
          return void response.status(500).json();
        }

        const foundSession = await findOnCache(`session:${cachedSession.sid}`);

        if (!isSessionCache(foundSession)) {
          return void response.status(500).json();
        }

        const foundSessionChallenge = await findOnCache(
          `session:${foundSession.sessionId}:challenge`
        );

        if (!isChallengeCache(foundSessionChallenge)) {
          return void response.status(500).json();
        }

        if (schemaArgs.body.code !== foundSessionChallenge.code) {
          return void response.status(400).json();
        }

        await updateOnCache(`session:${foundSession.sessionId}:challenge`, {
          ...foundSessionChallenge,
          isChecked: true,
        });

        return void response.status(201).json();
      }
    );

    router.put(
      '/:id/session/challenge/revoke',
      isAuthenticated,
      isChallengeCompleted,
      createRateLimit(15 * 60 * 1000, 5),
      async (request: Request, response: Response) => {
        const { error: schemaErrors } =
          updateUserSessionChallengeIsRevokedSchema.safeParse({
            body: request.body,
            params: request.params,
          });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { getSession } = SessionProvider(request, response);
        const { findOnCache, isChallengeCache, isSessionCache, updateOnCache } =
          CacheDataSource();

        const cachedSession = getSession();

        if (cachedSession?.sid === undefined) {
          return void response.status(500).json();
        }

        const foundSession = await findOnCache(`session:${cachedSession.sid}`);

        if (!isSessionCache(foundSession)) {
          return void response.status(500).json();
        }

        const foundSessionChallenge = await findOnCache(
          `session:${foundSession.sessionId}:challenge`
        );

        if (!isChallengeCache(foundSessionChallenge)) {
          return void response.status(500).json();
        }

        await updateOnCache(`session:${foundSession.sessionId}:challenge`, {
          ...foundSessionChallenge,
          isRevoked: true,
        });

        return void response.status(201).json();
      }
    );

    /**
     * Sessions
     */

    router.post(
      '/session',
      isAuthenticating,
      createRateLimit(15 * 60 * 1000, 5),
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          createUserSessionSchema.safeParse({ body: request.body });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { createUserSession } = CreateUserSessionUseCase();
        const { args, statusCode } = await createUserSession({
          schemaArgs,
        });

        if (args === undefined) {
          return void response.status(statusCode).json();
        }

        const randomProvider = RandomProvider();
        const sessionProvider = SessionProvider(request, response);
        const { addToCache } = CacheDataSource();
        const tokenProvider = TokenProvider();

        const sessionId = randomProvider.createRandomUuid();

        const refreshToken = await tokenProvider.createToken(
          { sessionId },
          '7d',
          process.env.SESSION_TOKEN_SECRET
        );

        if (refreshToken === undefined) {
          return void response.status(500).json();
        }

        sessionProvider.addToSession(sessionId, schemaArgs.body.rememberDevice);

        await addToCache(`session:${sessionId}`, {
          deviceUuid: schemaArgs.body.rememberDevice ? crypto.randomUUID() : '',
          expiresIn: randomProvider.createExpirationTime(),
          refreshToken,
          roleId: args.roleId,
          sessionId: sessionId,
          userId: args.id,
        });

        return void response.status(statusCode).json(args);
      }
    );

    router.delete(
      '/:id/session',
      isAuthenticated,
      isChallengeCompleted,
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          deleteUserSessionByIdSchema.safeParse({ params: request.params });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { deleteUserSessionById } = DeleteUserSessionByIdUseCase();
        const { statusCode } = await deleteUserSessionById({
          schemaArgs,
        });

        const { clearSession, getSession } = SessionProvider(request, response);

        const session = getSession();

        if (session && session.sid !== undefined) {
          const { removeFromCache } = CacheDataSource();
          await removeFromCache(`session:${session.sid}`);
          clearSession();
        }

        return void response.status(statusCode).json();
      }
    );

    /**
     * CRUD
     */

    router.get(
      '/:id',
      isAuthenticated,
      isChallengeCompleted,
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          findUserByIdSchema.safeParse({ params: request.params });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { findUserById } = FindUserByIdUseCase();
        const { args, statusCode } = await findUserById({
          schemaArgs,
        });

        return void response.status(statusCode).json(args);
      }
    );

    router.post(
      '/',
      createRateLimit(15 * 60 * 1000, 5),
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          createUserSchema.safeParse({ body: request.body });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { createUser } = CreateUserUseCase();
        const { args, statusCode } = await createUser({
          schemaArgs,
        });

        return void response.status(statusCode).json({ id: args?.id });
      }
    );

    router.put(
      '/:id',
      isAuthenticated,
      isChallengeCompleted,
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          updateUserByIdSchema.safeParse({
            body: request.body,
            params: request.params,
          });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { updateUserById } = UpdateUserByIdUseCase();
        const { args, statusCode } = await updateUserById({
          schemaArgs,
        });

        return void response.status(statusCode).json({
          id: args?.id,
          updatedAt: args?.updatedAt,
        });
      }
    );

    router.put(
      '/:id/access-code',
      isAuthenticated,
      isChallengeCompleted,
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          updateUserAccessCodeByIdSchema.safeParse({ params: request.params });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { updateUserAccessCodeById } = UpdateUserAccessCodeByIdUseCase();
        const { args, statusCode } = await updateUserAccessCodeById({
          schemaArgs,
        });

        const sessionProvider = SessionProvider(request, response);
        const cookies = sessionProvider.getSession();

        if (args === undefined || cookies?.sid === undefined) {
          return void response.status(500).json();
        }

        const { addToCache, findOnCache, updateOnCache } = CacheDataSource();
        const { createExpirationTime, createRandomUuid } = RandomProvider();
        const { createToken } = TokenProvider();

        const refreshToken = await createToken(
          { sessionId: cookies.sid },
          '7d',
          process.env.SESSION_TOKEN_SECRET
        );

        if (refreshToken === undefined) {
          return void response.status(500).json();
        }

        const foundSession = await findOnCache(`session:${cookies.sid}`);

        if (foundSession === undefined) {
          await addToCache(`session:${cookies.sid}`, {
            deviceUuid: createRandomUuid(),
            expiresIn: createExpirationTime(),
            refreshToken,
            roleId: args.roleId,
            sessionId: cookies.sid,
            userId: args.id,
          });
        } else {
          await updateOnCache(`session:${cookies.sid}`, {
            ...foundSession,
            expiresIn: createExpirationTime(),
            refreshToken,
          });
        }

        return void response.status(statusCode).json({
          id: args?.id,
          updatedAt: args?.updatedAt,
        });
      }
    );

    router.put(
      '/access-code',
      createRateLimit(15 * 60 * 1000, 5),
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema.safeParse({
            body: request.body,
          });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { updateUserAccessCodeByUsernameOrEmailOrPhoneNumber } =
          UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase();

        const { args, statusCode } =
          await updateUserAccessCodeByUsernameOrEmailOrPhoneNumber({
            schemaArgs,
          });

        return void response.status(statusCode).json({
          id: args?.id,
          updatedAt: args?.updatedAt,
        });
      }
    );

    return router;
  };

  return { subscribe };
};

export { UserRouter };
