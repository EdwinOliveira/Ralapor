import type { Request, Response } from "express";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import { createBookSchema } from "../../domains/Book";

const CreateBookUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		createBook: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createBookSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundBooksId } =
				await repository.findBookByDossierId({
					query: { dossierId: schemaArgs.body.dossierId },
				});

			if (foundBooksId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: createdBooksId } = await repository.createBook({
				args: schemaArgs.body,
			});

			if (createdBooksId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/books/${createdBooksId[0]}`)
				.json();
		},
	};
};

export { CreateBookUseCase };
