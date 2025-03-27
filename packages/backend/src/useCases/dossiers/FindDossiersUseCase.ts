import {
	type DossierDTO,
	dossierDTOMapper,
	type FindDossiersRequest,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindDossiersUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		findDossiers: async ({
			schemaArgs: {
				query: { minLimit, maxLimit },
			},
		}: UseCaseRequest<FindDossiersRequest>): Promise<
			UseCaseResponse<Array<DossierDTO>>
		> => {
			const { affectedRows: foundDossiersRow } =
				await repository.findDossiers();

			if (foundDossiersRow.length === 0) {
				return { statusCode: 404 };
			}

			const dossierDTOs = [];
			const minLimitValue = minLimit ?? 0;
			const maxLimitValue = maxLimit ?? foundDossiersRow.length;

			for (let i = minLimitValue; i < maxLimitValue; i++) {
				dossierDTOs.push(dossierDTOMapper(foundDossiersRow[i]));
			}

			return {
				statusCode: 200,
				args: dossierDTOs,
			};
		},
	};
};

export { FindDossiersUseCase };
