import type {
	UpdateUserAccessCodeByIdRequest,
	UserEntity,
} from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { RandomProvider } from "../../providers/RandomProvider";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const UpdateUserAccessCodeByIdUseCase = () => {
	const repository = UserRemoteRepository();
	const randomProvider = RandomProvider();
	const hashProvider = HashProvider();

	return {
		updateUserAccessCodeById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<UpdateUserAccessCodeByIdRequest>): Promise<
			UseCaseResponse<Pick<UserEntity, "id" | "roleId" | "updatedAt">>
		> => {
			const { affectedIds: foundUsersId } = await repository.findUserById({
				query: { id },
			});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

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
					roleId: updatedUsersRow[0].roleId,
					updatedAt: updatedUsersRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateUserAccessCodeByIdUseCase };
