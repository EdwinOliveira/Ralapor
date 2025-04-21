import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type {
	UpdateUserAccessCodeByIdRequest,
	UserEntity,
} from "../../domains/User";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const UpdateUserAccessCodeByIdUseCase = () => {
	return {
		updateUserAccessCodeById: async ({
			schemaArgs: {
				params: { id },
			},
			httpContext,
		}: UseCaseRequest<UpdateUserAccessCodeByIdRequest>): Promise<
			UseCaseResponse<Pick<UserEntity, "id" | "updatedAt">>
		> => {
			const { findUserById, updateUserById } =
				UserRemoteRepository(httpContext);

			const { affectedIds: foundUsersId } = await findUserById({
				query: { id },
			});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const accessCode =
				httpContext.providers.randomProvider.createAccessCode(12);
			const hashedAccessCode =
				await httpContext.providers.hashProvider.hash(accessCode);

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await updateUserById({
					query: { id },
					args: { accessCode: hashedAccessCode },
				});

			if (updatedUsersId.length === 0) {
				return { statusCode: 500 };
			}

			console.log(accessCode);

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

export { UpdateUserAccessCodeByIdUseCase };
