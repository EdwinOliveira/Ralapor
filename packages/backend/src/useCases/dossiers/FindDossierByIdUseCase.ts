import {
	type DossierDTO,
	dossierDTOMapper,
	type FindDossierByIdRequest,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindDossierByIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossierById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindDossierByIdRequest>): Promise<
			UseCaseResponse<DossierDTO>
		> => {
			const { affectedRows: foundDossiersId } =
				await repository.findDossierById({
					query: { id },
				});

			if (foundDossiersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: dossierDTOMapper(foundDossiersId[0]),
			};
		},
	};
};

export { FindDossierByIdUseCase };
