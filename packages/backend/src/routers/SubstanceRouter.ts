import type { Request, Response, Router } from "express";
import { SessionGuard } from "../guards/SessionGuard";
import {
	createSubstanceSchema,
	findSubstanceByIdSchema,
	findSubstancesByQuerySchema,
	updateSubstanceByIdSchema,
} from "../domains/Substance";
import { FindSubstanceByIdUseCase } from "../useCases/substances/FindSubstanceByIdUseCase";
import { FindSubstanceByQueryUseCase } from "../useCases/substances/FindSubstanceByQueryUseCase";
import { CreateSubstanceUseCase } from "../useCases/substances/CreateSubstanceUseCase";
import { UpdateSubstanceByIdUseCase } from "../useCases/substances/UpdateSubstanceByIdUseCase";

const SubstanceRouter = () => {
	const { isAuthenticated } = SessionGuard();

	const subscribe = (router: Router): Router => {
		router.get(
			"/",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findSubstancesByQuerySchema.safeParse({ query: request.query });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findSubstanceByQuery } = FindSubstanceByQueryUseCase();
				const { statusCode, args } = await findSubstanceByQuery({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findSubstanceByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findSubstanceById } = FindSubstanceByIdUseCase();
				const { statusCode, args } = await findSubstanceById({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createSubstanceSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { createSubstance } = CreateSubstanceUseCase();
			const { statusCode, args } = await createSubstance({
				schemaArgs,
			});

			return void response.status(statusCode).json({ id: args?.id });
		});

		router.put(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateSubstanceByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateSubstanceById } = UpdateSubstanceByIdUseCase();
				const { statusCode, args } = await updateSubstanceById({
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

export { SubstanceRouter };
