import type { Request, Response } from "express";
import {
	dossierDTOMapper,
	findDossierByIdSchema,
	findDossierByUserIdSchema,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";

const FindDossierByUserIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossierByUserId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findDossierByUserIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findDossierByUserId({
				query: { userId: schemaArgs.params.userId },
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

export { FindDossierByUserIdUseCase };
