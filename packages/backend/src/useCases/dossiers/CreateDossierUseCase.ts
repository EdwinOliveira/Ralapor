import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import type { CreateDossierRequest } from "../../domains/Dossier";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreateDossierUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		createDossier: async ({
			schemaArgs: {
				body: { userId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreateDossierRequest>): Promise<
			UseCaseResponse<unknown>
		> => {
			const { affectedIds: foundDossiersId } =
				await repository.findDossiersByUserId({
					query: { userId },
				});

			if (foundDossiersId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdDossiersId } = await repository.createDossier(
				{ args: { userId, categoryId, designation, description, price } },
			);

			if (createdDossiersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/dossiers/${createdDossiersId[0]}` },
			};
		},
	};
};

export { CreateDossierUseCase };
