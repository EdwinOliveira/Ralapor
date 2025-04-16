import type { Request, Response, Router } from "express";
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
import { SessionGuard } from "../guards/SessionGuard";

const ProfileRouter = () => {
	const { isAuthenticated } = SessionGuard();

	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findProfileByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { statusCode, args } =
					await FindProfileByIdUseCase().findProfileById({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/user/:userId",
			isAuthenticated,
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
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					createProfileSchema.safeParse({
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { createProfile } = CreateProfileUseCase();
				const { statusCode, args } = await createProfile({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/profiles/${args?.id}`)
					.json();
			},
		);

		router.put(
			"/:id",
			isAuthenticated,
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
				const { statusCode, args } = await updateProfileById({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/profiles/${args?.id}`)
					.json({ updatedAt: args?.updatedAt });
			},
		);

		return router;
	};

	return { subscribe };
};

export { ProfileRouter };
