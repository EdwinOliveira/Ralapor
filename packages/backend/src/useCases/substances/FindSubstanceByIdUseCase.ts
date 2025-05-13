import {
	substanceDTOMapper,
	type FindSubstanceByIdRequest,
	type SubstanceDTO,
} from "../../domains/Substance";
import { SubstanceRemoteRepository } from "../../repositories/SubstanceRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindSubstanceByIdUseCase = () => {
	const repository = SubstanceRemoteRepository();

	return {
		findSubstanceById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindSubstanceByIdRequest>): Promise<
			UseCaseResponse<SubstanceDTO>
		> => {
			const { affectedRows: foundSubstancessRow } =
				await repository.findSubstanceById({
					query: { id },
				});

			if (foundSubstancessRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: substanceDTOMapper(foundSubstancessRow[0]),
			};
		},
	};
};

export { FindSubstanceByIdUseCase };
