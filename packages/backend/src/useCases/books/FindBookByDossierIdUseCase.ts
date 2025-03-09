import type { Request, Response } from "express";
import { bookDTOMapper, findBookByDossierIdSchema } from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";

const FindBookByDossierIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBookByDossierId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findBookByDossierIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findBookByDossierId({
				query: { dossierId: schemaArgs.params.dossierId },
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

export { FindBookByDossierIdUseCase };
