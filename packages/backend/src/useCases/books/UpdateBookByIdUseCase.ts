import type { Request, Response } from "express";
import { updateBookByIdSchema } from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";

const UpdateBookByIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		updateBookById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateBookByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundBooksId } = await repository.findBookById({
				query: { id: schemaArgs.params.id },
			});

			if (foundBooksId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updateBooksById } = await repository.updateBookById({
				query: schemaArgs.params,
				args: schemaArgs.body,
			});

			if (updateBooksById.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/books/${updateBooksById[0]}`)
				.json();
		},
	};
};

export { UpdateBookByIdUseCase };
