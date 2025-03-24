import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindBookByIdUseCase } from "../useCases/books/FindBookByIdUseCase";
import { CreateBookUseCase } from "../useCases/books/CreateBookUseCase";
import { UpdateBookByIdUseCase } from "../useCases/books/UpdateBookByIdUseCase";
import { FindBooksByDossierIdUseCase } from "../useCases/books/FindBooksByDossierIdUseCase";
import { FindBooksByCategoryIdUseCase } from "../useCases/books/FindBooksByCategoryIdUseCase";
import {
	createBookSchema,
	findBookByIdSchema,
	findBooksByCategoryIdSchema,
	findBooksByDossierIdSchema,
	updateBookByIdSchema,
} from "../domains/Book";

const BookRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findBookByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findBookById } = FindBookByIdUseCase();
				const { statusCode, args } = await findBookById({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/dossier/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findBooksByDossierIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findBooksByDossierId } = FindBooksByDossierIdUseCase();
				const { statusCode, args } = await findBooksByDossierId({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/category/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findBooksByCategoryIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findBooksByCategoryId } = FindBooksByCategoryIdUseCase();
				const { statusCode, args } = await findBooksByCategoryId({
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
					createBookSchema.safeParse({
						params: request.params,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { createBook } = CreateBookUseCase();
				const { statusCode, args } = await createBook({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/books/${args?.id}`)
					.json();
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateBookByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateBookById } = UpdateBookByIdUseCase();
				const { statusCode, args } = await updateBookById({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(`/books/${args?.id}`)
					.json({ updatedAt: args?.updatedAt });
			},
		);

		return router;
	};

	return { subscribe };
};

export { BookRouter };
