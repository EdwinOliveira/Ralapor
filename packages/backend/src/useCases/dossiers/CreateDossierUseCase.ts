import type { Request, Response } from "express";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import { createDossierSchema } from "../../domains/Dossier";

const CreateDossierUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		createDossier: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createDossierSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundDossiersId } =
				await repository.findDossiersByUserId({
					query: { userId: schemaArgs.body.userId },
				});

			if (foundDossiersId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: createdDossiersId } = await repository.createDossier(
				{ args: schemaArgs.body },
			);

			if (createdDossiersId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/dossiers/${createdDossiersId[0]}`)
				.json();
		},
	};
};

export { CreateDossierUseCase };
