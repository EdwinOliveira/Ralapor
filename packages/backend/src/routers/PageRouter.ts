import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindPageByIdUseCase } from "../useCases/pages/FindPageByIdUseCase";
import { CreatePageUseCase } from "../useCases/pages/CreatePageUseCase";
import { UpdatePageByIdUseCase } from "../useCases/pages/UpdatePageByIdUseCase";
import { FindPagesByChapterIdUseCase } from "../useCases/pages/FindPagesByChapterIdUseCase";
import { FindPagesByCategoryIdUseCase } from "../useCases/pages/FindPagesByCategoryIdUseCase";

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
				const { findPagesByChapterId } = FindPagesByChapterIdUseCase();
				await findPagesByChapterId(request, response);
			},
		);

		router.get(
			"/category/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findPagesByCategoryId } = FindPagesByCategoryIdUseCase();
				await findPagesByCategoryId(request, response);
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
