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

const UserRouter = () => {
	const { isAuthenticated, isAuthenticating } = SessionGuard();

	const subscribe = (router: Router, context: Context): Router => {
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

				const { findUserById } = FindUserByIdUseCase(context);
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

				context.providers.sessionProvider = SessionProvider(request, response);
				const { findUserByAccessCode } = FindUserByAccessCodeUseCase(context);
				const { statusCode, args } = await findUserByAccessCode({
					schemaArgs,
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

			const { createUser } = CreateUserUseCase(context);
			const { statusCode, args } = await createUser({
				schemaArgs,
			});

			return void response.status(statusCode).json({ id: args?.id });
		});

		router.put("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateUserByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { updateUserById } = UpdateUserByIdUseCase(context);
			const { statusCode, args } = await updateUserById({
				schemaArgs,
			});

			return void response.status(statusCode).json({
				id: args?.id,
				updatedAt: args?.updatedAt,
			});
		});

		router.put(
			"/:id/access-code",
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateUserAccessCodeByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateUserAccessCodeById } =
					UpdateUserAccessCodeByIdUseCase(context);
				const { statusCode, args } = await updateUserAccessCodeById({
					schemaArgs,
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
					UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase(context);

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
