import type { Request, Response, Router } from "express";
import { FindUserByIdUseCase } from "../useCases/users/FindUserByIdUseCase";
import { FindUserByAccessCodeUseCase } from "../useCases/users/FindUserByAccessCodeUseCase";
import { CreateUserUseCase } from "../useCases/users/CreateUserUseCase";
import { UpdateUserByIdUseCase } from "../useCases/users/UpdateUserByIdUseCase";
import { UpdateUserAccessCodeByIdUseCase } from "../useCases/users/UpdateUserAccessCodeByIdUseCase";
import { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase } from "../useCases/users/UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase";
import {
	createUserSchema,
	findUserByAccessCodeSchema,
	findUserByIdSchema,
	updateUserAccessCodeByIdSchema,
	updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema,
	updateUserByIdSchema,
} from "../domains/User";
import type { Context } from "../signatures/Context";
import { SessionProvider } from "../providers/SessionProvider";
import { SessionGuard } from "../guards/SessionGuard";
import { CacheService } from "../services/CacheService";
import { RandomProvider } from "../providers/RandomProvider";

const UserRouter = () => {
	const { isAuthenticated, isAuthenticating } = SessionGuard();

	const subscribe = (router: Router): Router => {
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

		router.get(
			"/access-code/:accessCode",
			isAuthenticating,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findUserByAccessCodeSchema.safeParse({ params: request.params });

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
				const sessionProvider = SessionProvider();
				const cacheService = CacheService();

				const sessionId = randomProvider.createRandomUuid();
				sessionProvider.addToSession(sessionId);

				await cacheService.addToCache(`session:${sessionId}`, {
					sessionId: sessionId,
					userId: args.id,
					roleId: args.roleId,
					expiresIn: new Date().setSeconds(
						randomProvider.createExpirationTime(),
					),
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createUserSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { createUser } = CreateUserUseCase();
			const { statusCode, args } = await createUser({
				schemaArgs,
			});

			return void response.status(statusCode).json({ id: args?.id });
		});

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

				const sessionProvider = SessionProvider();
				const cookies = sessionProvider.getSession();

				if (args === undefined || cookies.sid === undefined) {
					return void response.status(500).json();
				}

				const cacheService = CacheService();
				const randomProvider = RandomProvider();

				await cacheService.updateOnCache(`session:${cookies.sid}`, {
					sessionId: cookies.sid,
					userId: args?.id,
					roleId: args?.roleId,
					expiresIn: new Date().setSeconds(
						randomProvider.createExpirationTime(),
					),
				});

				return void response.status(statusCode).json({
					id: args?.id,
					updatedAt: args?.updatedAt,
				});
			},
		);

		router.put(
			"/:username/:email/:phoneNumber/access-code",
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema.safeParse({
						params: request.params,
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

		return router;
	};

	return { subscribe };
};

export { UserRouter };
