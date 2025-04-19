import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type {
	UpdateUserAccessCodeByIdRequest,
	UserEntity,
} from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { RandomProvider } from "../../providers/RandomProvider";
import { MailProvider } from "../../providers/MailProvider";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

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
			UseCaseResponse<Pick<UserEntity, "id" | "updatedAt">>
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

			/*
			await mailProvider.sendMail({
				toAddress: foundUsersRow[0].email,
				subject: "Regain access to Ralapor!",
				text: `Ralapor access code: ${accessCode}`,
			});
      */

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
