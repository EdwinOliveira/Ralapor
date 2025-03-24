import {
	type DossierDTO,
	dossierDTOMapper,
	type FindDossiersByCategoryIdRequest,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindDossiersByCategoryIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossiersByCategoryId: async ({
			schemaArgs: {
				params: { categoryId },
			},
		}: UseCaseRequest<FindDossiersByCategoryIdRequest>): Promise<
			UseCaseResponse<Array<DossierDTO>>
		> => {
			const { affectedRows: foundDossiersId } =
				await repository.findDossiersByCategoryId({
					query: { categoryId },
				});

			if (foundDossiersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: foundDossiersId.map((foundDossierId) =>
					dossierDTOMapper(foundDossierId),
				),
			};
		},
	};
};

export { FindDossiersByCategoryIdUseCase };
