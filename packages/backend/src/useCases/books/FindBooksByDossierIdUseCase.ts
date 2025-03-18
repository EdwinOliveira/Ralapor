import type { Request, Response } from "express";
import { bookDTOMapper, findBooksByDossierIdSchema } from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";

const FindBooksByDossierIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBooksByDossierId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findBooksByDossierIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findBooksByDossierId({
				query: { dossierId: schemaArgs.params.dossierId },
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

export { FindBooksByDossierIdUseCase };
