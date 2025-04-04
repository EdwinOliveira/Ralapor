import type { Request, Response, Router } from "express";
import { FindPageByIdUseCase } from "../useCases/pages/FindPageByIdUseCase";
import { CreatePageUseCase } from "../useCases/pages/CreatePageUseCase";
import { UpdatePageByIdUseCase } from "../useCases/pages/UpdatePageByIdUseCase";
import { FindPagesByChapterIdUseCase } from "../useCases/pages/FindPagesByChapterIdUseCase";
import { FindPagesByCategoryIdUseCase } from "../useCases/pages/FindPagesByCategoryIdUseCase";
import {
	createPageSchema,
	findPageByIdSchema,
	findPagesByCategoryIdSchema,
	findPagesByChapterIdSchema,
	findPagesSchema,
	updatePageByIdSchema,
} from "../domains/Page";
import { FindPagesUseCase } from "../useCases/pages/FindPagesUseCase";

const PageRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findPagesSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { findPages } = FindPagesUseCase();
			const { statusCode, args } = await findPages({
				schemaArgs,
			});

			return void response.status(statusCode).json(args);
		});

		router.get("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findPageByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { statusCode, args } = await FindPageByIdUseCase().findPageById({
				schemaArgs,
			});

			return void response.status(statusCode).json(args);
		});

		router.get("/chapter/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findPagesByChapterIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { findPagesByChapterId } = FindPagesByChapterIdUseCase();
			const { statusCode, args } = await findPagesByChapterId({ schemaArgs });

			return void response.status(statusCode).json(args);
		});

		router.get(
			"/category/:id",
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findPagesByCategoryIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findPagesByCategoryId } = FindPagesByCategoryIdUseCase();
				const { statusCode, args } = await findPagesByCategoryId({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createPageSchema.safeParse({
					params: request.params,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { createPage } = CreatePageUseCase();
			const { statusCode, args } = await createPage({
				schemaArgs,
			});

			return void response
				.status(statusCode)
				.location(`/pages/${args?.id}`)
				.json();
		});

		router.put("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updatePageByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { updatePageById } = UpdatePageByIdUseCase();
			const { statusCode, args } = await updatePageById({
				schemaArgs,
			});

			return void response
				.status(statusCode)
				.location(`/pages/${args?.id}`)
				.json({ updatedAt: args?.updatedAt });
		});

		return router;
	};

	return { subscribe };
};

export { PageRouter };
