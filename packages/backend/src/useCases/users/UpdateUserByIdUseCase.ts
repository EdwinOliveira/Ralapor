import type { UpdateUserByIdRequest, UserDTO } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { Context } from "../../signatures/Context";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const UpdateUserByIdUseCase = (context: Context) => {
	const repository = UserRemoteRepository(context.services.databaseService);

	return {
		updateUserById: async ({
			schemaArgs: {
				params: { id },
				body: schemaArgsBody,
			},
		}: UseCaseRequest<UpdateUserByIdRequest>): Promise<
			UseCaseResponse<Pick<UserDTO, "id" | "updatedAt">>
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
