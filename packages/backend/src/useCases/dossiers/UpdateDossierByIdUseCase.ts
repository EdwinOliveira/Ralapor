import type { Request, Response } from "express";
import { updateDossierByIdSchema } from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";

const UpdateDossierByIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		updateDossierById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateDossierByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundDossiersId } = await repository.findDossierById(
				{ query: { id: schemaArgs.params.id } },
			);

			if (foundDossiersId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updateDossiersById } =
				await repository.updateDossierById({
					query: schemaArgs.params,
					args: schemaArgs.body,
				});

			if (updateDossiersById.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/dossiers/${updateDossiersById[0]}`)
				.json();
		},
	};
};

export { UpdateDossierByIdUseCase };
