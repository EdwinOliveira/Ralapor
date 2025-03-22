import type { Request, Response } from "express";
import { bookDTOMapper, findBooksByCategoryIdSchema } from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";

const FindBooksByCategoryIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBooksByCategoryId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findBooksByCategoryIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findBooksByCategoryId({
				query: { categoryId: schemaArgs.params.categoryId },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response.status(200).json({
				data: affectedRows.map((affectedRow) => bookDTOMapper(affectedRow)),
			});
		},
	};
};

export { FindBooksByCategoryIdUseCase };
