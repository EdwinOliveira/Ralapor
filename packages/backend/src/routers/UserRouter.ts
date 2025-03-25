import type { Request, Response, Router } from "express";
import { FindUserByIdUseCase } from "../useCases/users/FindUserByIdUseCase";
import { FindUserByAccessCodeUseCase } from "../useCases/users/FindUserByAccessCodeUseCase";
import { CreateUserUseCase } from "../useCases/users/CreateUserUseCase";
import { UpdateUserByIdUseCase } from "../useCases/users/UpdateUserByIdUseCase";
import { UpdateUserAccessCodeByIdUseCase } from "../useCases/users/UpdateUserAccessCodeByIdUseCase";
import { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase } from "../useCases/users/UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase";
import { UpdateUserTokensByIdUseCase } from "../useCases/users/UpdateUserTokensByIdUseCase";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { DestroyUserTokensByIdUseCase } from "../useCases/users/DestroyUserTokensByIdUseCase";
import { RefreshTokenGuard } from "../guards/RefreshTokenGuard";
import {
	createUserSchema,
	destroyUserTokensByIdSchema,
	findUserByAccessCodeSchema,
	findUserByIdSchema,
	updateUserAccessCodeByIdSchema,
	updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema,
	updateUserByIdSchema,
	updateUserTokensByIdSchema,
} from "../domains/User";

const UserRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findUserByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findUserById } = FindUserByIdUseCase();
				const { statusCode, args } = await findUserById({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/access-code/:accessCode",
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findUserByAccessCodeSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findUserByAccessCode } = FindUserByAccessCodeUseCase();
				const { statusCode, args } = await findUserByAccessCode({ schemaArgs });

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
			const { statusCode, args } = await createUser({ schemaArgs });

			return void response
				.status(statusCode)
				.location(`/users/${args?.id}`)
				.json();
		});

		router.put(
			"/:id",
			AccessTokenGuard,
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

				return void response
					.status(statusCode)
					.location(`/users/${args?.id}`)
					.json({ updatedAt: args?.updatedAt });
			},
		);

		router.put(
			"/access-code/:id",
			AccessTokenGuard,
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

				return void response
					.status(statusCode)
					.location(`/users/${args?.id}`)
					.json({ updatedAt: args?.updatedAt });
			},
		);

		router.put(
			"/access-code/:username/:email/:phoneNumber",
			AccessTokenGuard,
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

				return void response
					.status(statusCode)
					.location(`/users/${args?.id}`)
					.json({ updatedAt: args?.updatedAt });
			},
		);

		router.put(
			"/:id/tokens",
			RefreshTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateUserTokensByIdSchema.safeParse({
						params: request.params,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { statusCode, args } =
					await UpdateUserTokensByIdUseCase().updateUserTokensById({
						schemaArgs,
					});

				return void response
					.status(statusCode)
					.location(`/users/${args?.id}`)
					.json({
						accessToken: args?.accessToken,
						refreshToken: args?.refreshToken,
						updatedAt: args?.updatedAt,
					});
			},
		);

		router.delete(
			"/:id/tokens",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					destroyUserTokensByIdSchema.safeParse({
						params: request.params,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { destroyUserTokensById } = DestroyUserTokensByIdUseCase();

				const { statusCode, args } = await destroyUserTokensById({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		return router;
	};

	return { subscribe };
};

export { UserRouter };
