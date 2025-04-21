import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type {
	UpdateUserAccessCodeByIdRequest,
	UserEntity,
} from "../../domains/User";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type { Context } from "../../signatures/Context";

const UpdateUserAccessCodeByIdUseCase = (context: Context) => {
	const repository = UserRemoteRepository(context);

	return {
		updateUserAccessCodeById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<UpdateUserAccessCodeByIdRequest>): Promise<
			UseCaseResponse<Pick<UserEntity, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundUsersId } = await repository.findUserById({
				query: { id },
			});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const { randomProvider, hashProvider } = context.providers;

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await repository.updateUserById({
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
