import type { Request, Response } from "express";
import { bookDTOMapper, findBookByIdSchema } from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";

const FindBookByIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBookById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findBookByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findBookById({
				query: { id: schemaArgs.params.id },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: bookDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindBookByIdUseCase };
