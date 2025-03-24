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
			const { affectedRows: foundDossiersId } =
				await repository.findDossiersByUserId({
					query: { userId },
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

export { FindDossiersByUserIdUseCase };
