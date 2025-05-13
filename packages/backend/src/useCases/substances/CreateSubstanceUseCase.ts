import type {
	CreateSubstanceRequest,
	SubstanceDTO,
} from "../../domains/Substance";
import { SubstanceRemoteRepository } from "../../repositories/SubstanceRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const CreateUserUseCase = () => {
	const repository = SubstanceRemoteRepository();

	return {
		createUser: async ({
			schemaArgs: {
				body: { designation, description, classification },
			},
		}: UseCaseRequest<CreateSubstanceRequest>): Promise<
			UseCaseResponse<Pick<SubstanceDTO, "id">>
		> => {
			const { affectedIds: foundSubstancesId } =
				await repository.findSubstanceByDesignation({
					query: { designation },
				});

			if (foundSubstancesId.length !== 0) {
				return { statusCode: 409 };
			}

			const { affectedIds: createdSubstancesId } =
				await repository.createSubstance({
					args: { designation, description, classification },
				});

			if (createdSubstancesId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdSubstancesId[0] },
			};
		},
	};
};

export { CreateUserUseCase };
