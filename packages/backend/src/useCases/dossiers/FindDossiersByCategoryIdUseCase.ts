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
			const { affectedRows } = await repository.findDossiersByCategoryId({
				query: { categoryId },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: affectedRows.map((affectedRow) => dossierDTOMapper(affectedRow)),
			};
		},
	};
};

export { FindDossiersByCategoryIdUseCase };
