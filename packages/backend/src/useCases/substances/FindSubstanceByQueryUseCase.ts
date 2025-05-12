import {
	substanceDTOMapper,
	type FindSubstancesByQueryRequest,
	type SubstanceDTO,
} from "../../domains/Substance";
import { SubstanceRemoteRepository } from "../../repositories/SubstanceRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindSubstanceByQueryUseCase = () => {
	const repository = SubstanceRemoteRepository();

	return {
		findSubstanceByQuery: async ({
			schemaArgs: {
				query: { classification },
			},
		}: UseCaseRequest<FindSubstancesByQueryRequest>): Promise<
			UseCaseResponse<SubstanceDTO>
		> => {
			const { affectedRows: foundSubstancesRow } =
				await repository.findSubstancesByQuery({
					query: { classification },
				});

			if (foundSubstancesRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: substanceDTOMapper(foundSubstancesRow[0]),
			};
		},
	};
};

export { FindSubstanceByQueryUseCase };
