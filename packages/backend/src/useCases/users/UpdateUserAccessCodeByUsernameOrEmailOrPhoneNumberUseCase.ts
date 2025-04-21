import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type {
	UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest,
	UserDTO,
} from "../../domains/User";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase = () => {
	return {
		updateUserAccessCodeByUsernameOrEmailOrPhoneNumber: async ({
			schemaArgs: {
				params: { username, email, phoneNumber },
			},
			context,
		}: UseCaseRequest<UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest>): Promise<
			UseCaseResponse<Pick<UserDTO, "id" | "updatedAt">>
		> => {
			const { findUserByUsernameOrEmailOrPhoneNumber, updateUserById } =
				UserRemoteRepository(context);

			const { affectedIds: foundUsersId, affectedRows: foundUsersRow } =
				await findUserByUsernameOrEmailOrPhoneNumber({
					query: { username, email, phoneNumber },
				});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const accessCode = context.providers.randomProvider.createAccessCode(12);
			const hashedAccessCode =
				await context.providers.hashProvider.hash(accessCode);

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await updateUserById({
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
