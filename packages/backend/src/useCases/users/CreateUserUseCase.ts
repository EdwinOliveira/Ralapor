import type { Request, Response } from "express";
import { createUserSchema } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { HashProvider } from "../../providers/HashProvider";
import { RandomProvider } from "../../providers/RandomProvider";
import { MailProvider } from "../../providers/MailProvider";

const CreateUserUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const randomProvider = RandomProvider();
	const mailProvider = MailProvider();

	return {
		createUser: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createUserSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundUsersId } =
				await repository.findUserByUsernameAndEmailAndPhoneNumber({
					query: {
						username: schemaArgs.body.username,
						email: schemaArgs.body.email,
						phoneNumber: schemaArgs.body.phoneNumber,
					},
				});

			if (foundUsersId.length === 0) {
				return response.status(404).json();
			}

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: createdUsersId } = await repository.createUser({
				args: {
					username: schemaArgs.body.username,
					email: schemaArgs.body.email,
					phoneNumber: schemaArgs.body.phoneNumber,
					phoneNumberCode: schemaArgs.body.phoneNumberCode,
					accessCode: hashedAccessCode,
				},
			});

			if (createdUsersId.length === 0) {
				return response.status(404).json();
			}

			await mailProvider.sendMail({
				toAddress: schemaArgs.body.email,
				subject: "Welcome to Ralapor!",
				text: `Ralapor access code: ${accessCode}`,
			});

			return response
				.status(201)
				.location(`/users/${createdUsersId[0]}`)
				.json();
		},
	};
};

export { CreateUserUseCase };
