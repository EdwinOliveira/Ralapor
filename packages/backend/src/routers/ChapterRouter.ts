import type { Request, Response, Router } from "express";
import { FindChapterByIdUseCase } from "../useCases/chapters/FindChapterByIdUseCase";
import { CreateChapterUseCase } from "../useCases/chapters/CreateChapterUseCase";
import { UpdateChapterByIdUseCase } from "../useCases/chapters/UpdateChapterByIdUseCase";
import { FindChaptersByBookIdUseCase } from "../useCases/chapters/FindChaptersByBookIdUseCase";
import { FindChaptersByCategoryIdUseCase } from "../useCases/chapters/FindChaptersByCategoryIdUseCase";
import {
	createChapterSchema,
	findChapterByIdSchema,
	findChaptersByBookIdSchema,
	findChaptersByCategoryIdSchema,
	findChaptersSchema,
	updateChapterByIdSchema,
} from "../domains/Chapter";
import { FindChaptersUseCase } from "../useCases/chapters/FindChaptersUseCase";

const ChapterRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findChaptersSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { findChapters } = FindChaptersUseCase();
			const { statusCode, args } = await findChapters({
				schemaArgs,
			});

			return void response.status(statusCode).json(args);
		});

		router.get("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findChapterByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { statusCode, args } =
				await FindChapterByIdUseCase().findChapterById({ schemaArgs });

			return void response.status(statusCode).json(args);
		});

		router.get("/book/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findChaptersByBookIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { findChaptersByBookId } = FindChaptersByBookIdUseCase();
			const { statusCode, args } = await findChaptersByBookId({ schemaArgs });

			return void response.status(statusCode).json(args);
		});

		router.get(
			"/category/:id",
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findChaptersByCategoryIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findChaptersByCategoryId } = FindChaptersByCategoryIdUseCase();
				const { statusCode, args } = await findChaptersByCategoryId({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createChapterSchema.safeParse({
					params: request.params,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { createChapter } = CreateChapterUseCase();
			const { statusCode, args } = await createChapter({
				schemaArgs,
			});

			return void response
				.status(statusCode)
				.location(`/chapters/${args?.id}`)
				.json();
		});

		router.put("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateChapterByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { updateChapterById } = UpdateChapterByIdUseCase();
			const { statusCode, args } = await updateChapterById({
				schemaArgs,
			});

			return void response
				.status(statusCode)
				.location(`/chapters/${args?.id}`)
				.json({ updatedAt: args?.updatedAt });
		});

		return router;
	};

	return { subscribe };
};

export { ChapterRouter };
