import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindChapterByIdUseCase } from "../useCases/chapters/FindChapterByIdUseCase";
import { CreateChapterUseCase } from "../useCases/chapters/CreateChapterUseCase";
import { UpdateChapterByIdUseCase } from "../useCases/chapters/UpdateChapterByIdUseCase";
import { FindChaptersByBookIdUseCase } from "../useCases/chapters/FindChaptersByBookIdUseCase";
import { FindChaptersByCategoryIdUseCase } from "../useCases/chapters/FindChaptersByCategoryIdUseCase";

const ChapterRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findChapterById } = FindChapterByIdUseCase();
				await findChapterById(request, response);
			},
		);

		router.get(
			"/book/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findChaptersByBookId } = FindChaptersByBookIdUseCase();
				await findChaptersByBookId(request, response);
			},
		);

		router.get(
			"/category/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findChaptersByCategoryId } = FindChaptersByCategoryIdUseCase();
				await findChaptersByCategoryId(request, response);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { createChapter } = CreateChapterUseCase();
				await createChapter(request, response);
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { updateChapterById } = UpdateChapterByIdUseCase();
				await updateChapterById(request, response);
			},
		);

		return router;
	};

	return { subscribe };
};

export { ChapterRouter };
