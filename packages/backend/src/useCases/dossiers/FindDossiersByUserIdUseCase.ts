import type { Request, Response } from "express";
import {
	dossierDTOMapper,
	findDossiersByUserIdSchema,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";

const FindDossiersByUserIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossiersByUserId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findDossiersByUserIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findDossiersByUserId({
				query: { userId: schemaArgs.params.userId },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response.status(200).json({
				data: affectedRows.map((affectedRow) => dossierDTOMapper(affectedRow)),
			});
		},
	};
};

export { FindDossiersByUserIdUseCase };
