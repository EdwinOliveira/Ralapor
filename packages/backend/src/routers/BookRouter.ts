import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindBookByIdUseCase } from "../useCases/books/FindBookByIdUseCase";
import { CreateBookUseCase } from "../useCases/books/CreateBookUseCase";
import { UpdateBookByIdUseCase } from "../useCases/books/UpdateBookByIdUseCase";
import { FindBookByDossierIdUseCase } from "../useCases/books/FindBookByDossierIdUseCase";

const BookRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findBookById } = FindBookByIdUseCase();
				await findBookById(request, response);
			},
		);

		router.get(
			"/dossier/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findBookByDossierId } = FindBookByDossierIdUseCase();
				await findBookByDossierId(request, response);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { createBook } = CreateBookUseCase();
				await createBook(request, response);
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { updateBookById } = UpdateBookByIdUseCase();
				await updateBookById(request, response);
			},
		);

		return router;
	};

	return { subscribe };
};

export { BookRouter };
