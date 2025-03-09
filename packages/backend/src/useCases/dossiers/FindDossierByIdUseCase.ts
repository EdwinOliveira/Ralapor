import type { Request, Response } from "express";
import { dossierDTOMapper, findDossierByIdSchema } from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";

const FindDossierByIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossierById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findDossierByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findDossierById({
				query: { id: schemaArgs.params.id },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: dossierDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindDossierByIdUseCase };
