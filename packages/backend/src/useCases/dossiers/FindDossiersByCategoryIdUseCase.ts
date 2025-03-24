import type { Request, Response } from "express";
import {
	dossierDTOMapper,
	findDossiersByCategoryIdSchema,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";

const FindDossiersByCategoryIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossiersByCategoryId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findDossiersByCategoryIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findDossiersByCategoryId({
				query: { categoryId: schemaArgs.params.categoryId },
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

export { FindDossiersByCategoryIdUseCase };
