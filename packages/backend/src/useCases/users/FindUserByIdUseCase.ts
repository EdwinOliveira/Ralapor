import {
	type FindUserByIdRequest,
	type UserDTO,
	userDTOMapper,
} from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindUserByIdUseCase = () => {
	const repository = UserRemoteRepository();

	return {
		findUserById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindUserByIdRequest>): Promise<
			UseCaseResponse<UserDTO>
		> => {
			const { affectedRows } = await repository.findUserById({
				query: { id },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return { statusCode: 200, args: userDTOMapper(affectedRows[0]) };
		},
	};
};

export { FindUserByIdUseCase };
