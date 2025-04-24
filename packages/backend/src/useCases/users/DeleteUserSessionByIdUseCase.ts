import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { DeleteUserSessionByIdRequest } from "../../domains/User";

const DeleteUserSessionByIdUseCase = () => {
	const repository = UserRemoteRepository();

	return {
		deleteUserSessionById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<DeleteUserSessionByIdRequest>): Promise<
			UseCaseResponse<void>
		> => {
			const { affectedRows: foundUsersRow } = await repository.findUserById({
				query: { id },
			});

			if (foundUsersRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 204,
			};
		},
	};
};

export { DeleteUserSessionByIdUseCase };
