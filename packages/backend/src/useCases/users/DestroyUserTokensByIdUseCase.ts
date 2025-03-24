import type { DestroyUserTokensByIdRequest, UserDTO } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const DestroyUserTokensByIdUseCase = () => {
	const repository = UserRemoteRepository();

	return {
		destroyUserTokensById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<DestroyUserTokensByIdRequest>): Promise<
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
					args: { accessToken: undefined, refreshToken: undefined },
				});

			if (updatedUsersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 204,
				args: {
					id: updatedUsersId[0],
					updatedAt: updatedUsersRow[0].updatedAt,
				},
			};
		},
	};
};

export { DestroyUserTokensByIdUseCase };
