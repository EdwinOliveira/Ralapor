import type { UpdateUserByIdRequest, UserDTO } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const UpdateUserByIdUseCase = () => {
	return {
		updateUserById: async ({
			schemaArgs: {
				params: { id },
				body: schemaArgsBody,
			},
			context,
		}: UseCaseRequest<UpdateUserByIdRequest>): Promise<
			UseCaseResponse<Pick<UserDTO, "id" | "updatedAt">>
		> => {
			const { findUserById, updateUserById } = UserRemoteRepository(context);

			const { affectedIds: foundUsersId } = await findUserById({
				query: { id },
			});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await updateUserById({
					query: { id },
					args: schemaArgsBody,
				});

			if (updatedUsersId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedUsersId[0],
					updatedAt: updatedUsersRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateUserByIdUseCase };
