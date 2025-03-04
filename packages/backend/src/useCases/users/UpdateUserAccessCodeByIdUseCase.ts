import type { Request, Response } from "express";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { updateUserByIdSchema } from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { RandomProvider } from "../../providers/RandomProvider";

const UpdateUserAccessCodeByIdUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const randomProvider = RandomProvider();

	return {
		updateUserAccessCodeById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateUserByIdSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundUsersId } = await repository.findUserById({
				query: { id: schemaArgs.params.id },
			});

			if (foundUsersId.length === 0) {
				return response.status(404).json();
			}

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: updateUsersId } = await repository.updateUserById({
				query: { id: schemaArgs.params.id },
				args: { accessCode: hashedAccessCode },
			});

			if (updateUsersId.length === 0) {
				return response.status(404).json();
			}

			return response.status(201).location(`/users/${updateUsersId[0]}`).json();
		},
	};
};

export { UpdateUserAccessCodeByIdUseCase };
