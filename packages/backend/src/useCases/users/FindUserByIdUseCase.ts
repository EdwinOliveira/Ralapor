import {
	type FindUserByIdRequest,
	type UserDTO,
	userDTOMapper,
} from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindUserByIdUseCase = () => {
	return {
		findUserById: async ({
			schemaArgs: {
				params: { id },
			},
			context,
		}: UseCaseRequest<FindUserByIdRequest>): Promise<
			UseCaseResponse<UserDTO>
		> => {
			const { findUserById } = UserRemoteRepository(context);

			const { affectedRows: foundUsersRow } = await findUserById({
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
