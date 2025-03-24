import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest } from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { RandomProvider } from "../../providers/RandomProvider";
import { MailProvider } from "../../providers/MailProvider";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const randomProvider = RandomProvider();
	const mailProvider = MailProvider();

	return {
		updateUserAccessCodeByUsernameOrEmailOrPhoneNumber: async ({
			schemaArgs: {
				params: { username, email, phoneNumber },
			},
		}: UseCaseRequest<UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest>): Promise<
			UseCaseResponse<unknown>
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
				return { statusCode: 404 };
			}

			await mailProvider.sendMail({
				toAddress: foundUsersRow[0].email,
				subject: "Regain access to Ralapor!",
				text: `Ralapor access code: ${accessCode}`,
			});

			return {
				statusCode: 201,
				headers: { location: `/users/${updatedUsersId[0]}` },
				args: { updatedAt: updatedUsersRow[0].updatedAt },
			};
		},
	};
};

export { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase };
