import type { Request, Response, Router } from "express";
import { FindUserByIdUseCase } from "../useCases/users/FindUserByIdUseCase";
import { FindUserByAccessCodeUseCase } from "../useCases/users/FindUserByAccessCodeUseCase";
import { CreateUserUseCase } from "../useCases/users/CreateUserUseCase";
import { UpdateUserByIdUseCase } from "../useCases/users/UpdateUserByIdUseCase";
import { UpdateUserAccessCodeByIdUseCase } from "../useCases/users/UpdateUserAccessCodeByIdUseCase";
import { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase } from "../useCases/users/UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase";
import {
	createUserSchema,
	deleteUserSessionByIdSchema,
	findUserByAccessCodeSchema,
	findUserByIdSchema,
	updateUserAccessCodeByIdSchema,
	updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema,
	updateUserByIdSchema,
} from "../domains/User";
import { SessionProvider } from "../providers/SessionProvider";
import { SessionGuard } from "../guards/SessionGuard";
import { CacheService } from "../services/CacheService";
import { RandomProvider } from "../providers/RandomProvider";
import { DeleteUserSessionByIdUseCase } from "../useCases/users/DeleteUserSessionByIdUseCase";
import { TokenProvider } from "../providers/TokenProvider";
import { RateLimitProvider } from "../providers/RateLimitProvider";

const UserRouter = () => {
	const { isAuthenticated, isAuthenticating } = SessionGuard();
	const { createRateLimit } = RateLimitProvider();

	const subscribe = (router: Router): Router => {
		router.get(
			"/sessions",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { getSession } = SessionProvider(request, response);
				const session = getSession();

				const { findOnCache } = CacheService();
				const foundSession = await findOnCache(`session:${session?.sid}`);

				/**
				 * Guard will validate the user session.
				 * This endpoint only exists to be called so the guard does the validation work.
				 */
				return void response.status(200).json(foundSession);
			},
		);

		router.get(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findUserByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findUserById } = FindUserByIdUseCase();
				const { statusCode, args } = await findUserById({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post(
			"/access-code",
			isAuthenticating,
			createRateLimit(15 * 60 * 1000, 5),
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findUserByAccessCodeSchema.safeParse({ body: request.body });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findUserByAccessCode } = FindUserByAccessCodeUseCase();
				const { statusCode, args } = await findUserByAccessCode({
					schemaArgs,
				});

				if (args === undefined) {
					return void response.status(statusCode).json();
				}

				const randomProvider = RandomProvider();
				const sessionProvider = SessionProvider(request, response);
				const cacheService = CacheService();
				const tokenProvider = TokenProvider();

				const sessionId = randomProvider.createRandomUuid();

				const refreshToken = await tokenProvider.createToken(
					{ sessionId },
					"7d",
					process.env.SESSION_TOKEN_SECRET,
				);

				if (refreshToken === undefined) {
					return void response.status(500).json();
				}

				sessionProvider.addToSession(sessionId, schemaArgs.body.rememberDevice);

				await cacheService.addToCache(`session:${sessionId}`, {
					sessionId: sessionId,
					userId: args.id,
					roleId: args.roleId,
					expiresIn: new Date().setSeconds(
						randomProvider.createExpirationTime(),
					),
					refreshToken,
					deviceUuid: schemaArgs.body.rememberDevice ? crypto.randomUUID() : "",
				});

				await cacheService.addToCache(
					`authentication_code:session:${sessionId}`,
					{ code: randomProvider.createRandomString(4) },
					300,
				);

				return void response.status(statusCode).json(args);
			},
		);

		router.post(
			"/",
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
				const { statusCode, args } = await createUser({
					schemaArgs,
				});

				return void response.status(statusCode).json({ id: args?.id });
			},
		);

		router.put(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateUserByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateUserById } = UpdateUserByIdUseCase();
				const { statusCode, args } = await updateUserById({
					schemaArgs,
				});

				return void response.status(statusCode).json({
					id: args?.id,
					updatedAt: args?.updatedAt,
				});
			},
		);

		router.put(
			"/:id/access-code",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateUserAccessCodeByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateUserAccessCodeById } = UpdateUserAccessCodeByIdUseCase();
				const { statusCode, args } = await updateUserAccessCodeById({
					schemaArgs,
				});

				const sessionProvider = SessionProvider(request, response);
				const cookies = sessionProvider.getSession();

				if (args === undefined || cookies?.sid === undefined) {
					return void response.status(500).json();
				}

				const { findOnCache, addToCache, updateOnCache } = CacheService();
				const { createRandomUuid, createExpirationTime } = RandomProvider();
				const { createToken } = TokenProvider();

				const refreshToken = await createToken(
					{ sessionId: cookies.sid },
					"7d",
					process.env.SESSION_TOKEN_SECRET,
				);

				if (refreshToken === undefined) {
					return void response.status(500).json();
				}

				const foundSession = await findOnCache(`session:${cookies.sid}`);

				if (foundSession === undefined) {
					await addToCache(`session:${cookies.sid}`, {
						sessionId: cookies.sid,
						userId: args.id,
						roleId: args.roleId,
						expiresIn: createExpirationTime(),
						refreshToken,
						deviceUuid: createRandomUuid(),
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
			},
		);

		router.put(
			"/access-code",
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

				const { statusCode, args } =
					await updateUserAccessCodeByUsernameOrEmailOrPhoneNumber({
						schemaArgs,
					});

				return void response.status(statusCode).json({
					id: args?.id,
					updatedAt: args?.updatedAt,
				});
			},
		);

		router.delete(
			"/:id/sessions",
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

				const { getSession, clearSession } = SessionProvider(request, response);

				const session = getSession();

				if (session && session.sid !== undefined) {
					const { removeFromCache } = CacheService();
					await removeFromCache(`session:${session.sid}`);
					clearSession();
				}

				return void response.status(statusCode).json();
			},
		);

		return router;
	};

	return { subscribe };
};

export { UserRouter };
