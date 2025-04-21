import {
	type FindUserByIdRequest,
	type UserDTO,
	userDTOMapper,
} from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { Context } from "../../signatures/Context";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindUserByIdUseCase = (context: Context) => {
	const repository = UserRemoteRepository(context);

	return {
		findUserById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindUserByIdRequest>): Promise<
			UseCaseResponse<UserDTO>
		> => {
			const { affectedRows: foundUsersRow } = await repository.findUserById({
				query: { id },
			});

			if (foundUsersRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: userDTOMapper(foundUsersRow[0]),
			};
		},
	};
};

export { FindUserByIdUseCase };
