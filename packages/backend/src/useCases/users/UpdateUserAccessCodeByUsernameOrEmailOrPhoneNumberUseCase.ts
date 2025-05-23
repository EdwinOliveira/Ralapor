import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type {
	UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest,
	UserDTO,
} from "../../domains/User";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import { RandomProvider } from "../../providers/RandomProvider";
import { HashProvider } from "../../providers/HashProvider";

const UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase = () => {
	const repository = UserRemoteRepository();
	const randomProvider = RandomProvider();
	const hashProvider = HashProvider();

	return {
		updateUserAccessCodeByUsernameOrEmailOrPhoneNumber: async ({
			schemaArgs: {
				params: { username, email, phoneNumber },
			},
		}: UseCaseRequest<UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest>): Promise<
			UseCaseResponse<Pick<UserDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundUsersId, affectedRows: foundUsersRow } =
				await repository.findUserByUsernameOrEmailOrPhoneNumber({
					query: { username, email, phoneNumber },
				});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await repository.updateUserById({
					query: { id: foundUsersRow[0].id },
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

export { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase };
