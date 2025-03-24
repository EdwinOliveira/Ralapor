import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindProfileByIdUseCase } from "../useCases/profiles/FindProfileByIdUseCase";
import { CreateProfileUseCase } from "../useCases/profiles/CreateProfileUseCase";
import { UpdateProfileByIdUseCase } from "../useCases/profiles/UpdateProfileByIdUseCase";
import { FindProfileByUserIdUseCase } from "../useCases/profiles/FindProfileByUserIdUseCase";
import {
	createProfileSchema,
	findProfileByIdSchema,
	findProfileByUserIdSchema,
	updateProfileByIdSchema,
} from "../domains/Profile";

const ProfileRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findProfileByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findProfileById } = FindProfileByIdUseCase();
				const { statusCode, args } = await findProfileById({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/user/:userId",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findProfileByUserIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findProfileByUserId } = FindProfileByUserIdUseCase();
				const { statusCode, args } = await findProfileByUserId({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					createProfileSchema.safeParse({
						params: request.params,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { createProfile } = CreateProfileUseCase();
				const { statusCode, headers } = await createProfile({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(headers ? headers.location : "")
					.json();
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateProfileByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateProfileById } = UpdateProfileByIdUseCase();
				const { statusCode, headers, args } = await updateProfileById({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(headers ? headers.location : "")
					.json(args);
			},
		);

		return router;
	};

	return { subscribe };
};

export { ProfileRouter };
