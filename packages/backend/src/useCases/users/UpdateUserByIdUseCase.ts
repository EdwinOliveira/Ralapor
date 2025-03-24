import type { UpdateUserByIdRequest } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateUserByIdUseCase = () => {
	const repository = UserRemoteRepository();

	return {
		updateUserById: async ({
			schemaArgs: {
				params: { id },
				body: schemaArgsBody,
			},
		}: UseCaseRequest<UpdateUserByIdRequest>): Promise<
			UseCaseResponse<unknown>
		> => {
			const { affectedIds: foundUsersId } = await repository.findUserById({
				query: { id },
			});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await repository.updateUserById({
					query: { id },
					args: schemaArgsBody,
				});

			if (updatedUsersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/users/${updatedUsersId[0]}` },
				args: { updatedAt: updatedUsersRow[0].updatedAt },
			};
		},
	};
};

export { UpdateUserByIdUseCase };
