import type { Request, Response } from "express";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { updateUserAccessCodeByIdSchema } from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { RandomProvider } from "../../providers/RandomProvider";
import { MailProvider } from "../../providers/MailProvider";

const UpdateUserAccessCodeByIdUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const randomProvider = RandomProvider();
	const mailProvider = MailProvider();

	return {
		updateUserAccessCodeById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateUserAccessCodeByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundUsersId, affectedRows: foundUsersRows } =
				await repository.findUserById({
					query: schemaArgs.params,
				});

			if (foundUsersId.length === 0) {
				return response.status(404).json();
			}

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: updateUsersId } = await repository.updateUserById({
				query: schemaArgs.params,
				args: { accessCode: hashedAccessCode },
			});

			if (updateUsersId.length === 0) {
				return response.status(404).json();
			}

			await mailProvider.sendMail({
				toAddress: foundUsersRows[0].email,
				subject: "Regain access to Ralapor!",
				text: `Ralapor access code: ${accessCode}`,
			});

			return response.status(201).location(`/users/${updateUsersId[0]}`).json();
		},
	};
};

export { UpdateUserAccessCodeByIdUseCase };
