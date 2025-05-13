import type {
	SubstanceDTO,
	UpdateSubstanceByIdRequest,
} from "../../domains/Substance";
import { SubstanceRemoteRepository } from "../../repositories/SubstanceRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const UpdateSubstanceByIdUseCase = () => {
	const repository = SubstanceRemoteRepository();

	return {
		updateSubstanceById: async ({
			schemaArgs: {
				params: { id },
				body: schemaArgsBody,
			},
		}: UseCaseRequest<UpdateSubstanceByIdRequest>): Promise<
			UseCaseResponse<Pick<SubstanceDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundSubstancesId } =
				await repository.findSubstanceById({
					query: { id },
				});

			if (foundSubstancesId.length === 0) {
				return { statusCode: 404 };
			}

			const {
				affectedIds: updatedSubstancesId,
				affectedRows: updatedSubstancesRow,
			} = await repository.updateSubstanceById({
				query: { id },
				args: schemaArgsBody,
			});

			if (updatedSubstancesId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedSubstancesId[0],
					updatedAt: updatedSubstancesRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateSubstanceByIdUseCase };
