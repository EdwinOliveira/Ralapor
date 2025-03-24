import {
	type DossierDTO,
	dossierDTOMapper,
	type FindDossiersByUserIdRequest,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindDossiersByUserIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossiersByUserId: async ({
			schemaArgs: {
				params: { userId },
			},
		}: UseCaseRequest<FindDossiersByUserIdRequest>): Promise<
			UseCaseResponse<Array<DossierDTO>>
		> => {
			const { affectedRows } = await repository.findDossiersByUserId({
				query: { userId },
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

export { FindDossiersByUserIdUseCase };
