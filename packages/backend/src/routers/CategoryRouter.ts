import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import {
	createCategorySchema,
	findCategoriesSchema,
	findCategoryByIdSchema,
	updateCategoryByIdSchema,
} from "../domains/Category";
import { FindCategoryByIdUseCase } from "../useCases/categories/FindCategoryByIdUseCase";
import { CreateCategoryUseCase } from "../useCases/categories/CreateCategoryUseCase";
import { UpdateCategoryByIdUseCase } from "../useCases/categories/UpdateCategoryByIdUseCase";
import { FindCategoriesUseCase } from "../useCases/categories/FindCategoriesUseCase";

const CategoryRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findCategoriesSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findCategories } = FindCategoriesUseCase();
				const { statusCode, args } = await findCategories({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findCategoryByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findCategoryById } = FindCategoryByIdUseCase();
				const { statusCode, args } = await findCategoryById({
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
					createCategorySchema.safeParse({
						params: request.params,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { createCategory } = CreateCategoryUseCase();
				const { statusCode, args } = await createCategory({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/categories/${args?.id}`)
					.json();
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateCategoryByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateCategoryById } = UpdateCategoryByIdUseCase();
				const { statusCode, args } = await updateCategoryById({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/categories/${args?.id}`)
					.json({ updatedAt: args?.updatedAt });
			},
		);

		return router;
	};

	return { subscribe };
};

export { CategoryRouter };
