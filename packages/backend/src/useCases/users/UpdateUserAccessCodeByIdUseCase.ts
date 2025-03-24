import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type {
	UpdateUserAccessCodeByIdRequest,
	UserEntity,
} from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { RandomProvider } from "../../providers/RandomProvider";
import { MailProvider } from "../../providers/MailProvider";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateUserAccessCodeByIdUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const randomProvider = RandomProvider();
	const mailProvider = MailProvider();

	return {
		updateUserAccessCodeById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<UpdateUserAccessCodeByIdRequest>): Promise<
			UseCaseResponse<Pick<UserEntity, "updatedAt">>
		> => {
			const { affectedIds: foundUsersId, affectedRows: foundUsersRows } =
				await repository.findUserById({ query: { id } });

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: updateUsersId, affectedRows: updatedUsersRow } =
				await repository.updateUserById({
					query: { id },
					args: { accessCode: hashedAccessCode },
				});

			if (updateUsersId.length === 0) {
				return { statusCode: 404 };
			}

			await mailProvider.sendMail({
				toAddress: foundUsersRows[0].email,
				subject: "Regain access to Ralapor!",
				text: `Ralapor access code: ${accessCode}`,
			});

			return {
				statusCode: 201,
				headers: { location: `/users/${updateUsersId[0]}` },
				args: { updatedAt: updatedUsersRow[0].updatedAt },
			};
		},
	};
};

export { UpdateUserAccessCodeByIdUseCase };
