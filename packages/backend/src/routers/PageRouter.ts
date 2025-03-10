import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindPageByIdUseCase } from "../useCases/pages/FindPageByIdUseCase";
import { CreatePageUseCase } from "../useCases/pages/CreatePageUseCase";
import { UpdatePageByIdUseCase } from "../useCases/pages/UpdatePageByIdUseCase";
import { FindPageByChapterIdUseCase } from "../useCases/pages/FindPageByChapterIdUseCase";

const PageRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findPageById } = FindPageByIdUseCase();
				await findPageById(request, response);
			},
		);

		router.get(
			"/chapter/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findPageByChapterId } = FindPageByChapterIdUseCase();
				await findPageByChapterId(request, response);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { createPage } = CreatePageUseCase();
				await createPage(request, response);
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { updatePageById } = UpdatePageByIdUseCase();
				await updatePageById(request, response);
			},
		);

		return router;
	};

	return { subscribe };
};

export { PageRouter };
