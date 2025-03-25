import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindDossierByIdUseCase } from "../useCases/dossiers/FindDossierByIdUseCase";
import { CreateDossierUseCase } from "../useCases/dossiers/CreateDossierUseCase";
import { UpdateDossierByIdUseCase } from "../useCases/dossiers/UpdateDossierByIdUseCase";
import { FindDossiersByUserIdUseCase } from "../useCases/dossiers/FindDossiersByUserIdUseCase";
import { FindDossiersByCategoryIdUseCase } from "../useCases/dossiers/FindDossiersByCategoryIdUseCase";
import {
	createDossierSchema,
	findDossierByIdSchema,
	findDossiersByCategoryIdSchema,
	findDossiersByUserIdSchema,
	updateDossierByIdSchema,
} from "../domains/Dossier";

const DossierRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findDossierByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { statusCode, args } =
					await FindDossierByIdUseCase().findDossierById({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/user/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findDossiersByUserIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findDossiersByUserId } = FindDossiersByUserIdUseCase();
				const { statusCode, args } = await findDossiersByUserId({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/category/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findDossiersByCategoryIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findDossiersByCategoryId } = FindDossiersByCategoryIdUseCase();
				const { statusCode, args } = await findDossiersByCategoryId({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					createDossierSchema.safeParse({
						params: request.params,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { createDossier } = CreateDossierUseCase();
				const { statusCode, args } = await createDossier({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/dossiers/${args?.id}`)
					.json();
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateDossierByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateDossierById } = UpdateDossierByIdUseCase();
				const { statusCode, args } = await updateDossierById({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/dossiers/${args?.id}`)
					.json({ updatedAt: args?.updatedAt });
			},
		);

		return router;
	};

	return { subscribe };
};

export { DossierRouter };
