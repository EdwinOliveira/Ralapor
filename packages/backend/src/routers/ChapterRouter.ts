import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindChapterByIdUseCase } from "../useCases/chapters/FindChapterByIdUseCase";
import { CreateChapterUseCase } from "../useCases/chapters/CreateChapterUseCase";
import { UpdateChapterByIdUseCase } from "../useCases/chapters/UpdateChapterByIdUseCase";
import { FindChapterByBookIdUseCase } from "../useCases/chapters/FindChapterByBookIdUseCase";

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
				const { findChapterByBookId } = FindChapterByBookIdUseCase();
				await findChapterByBookId(request, response);
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
