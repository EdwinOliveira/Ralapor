import type { Request, Response } from "express";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { updateUserByIdSchema } from "../../domains/User";

const UpdateUserByIdUseCase = () => {
	const repository = UserRemoteRepository();

	return {
		updateUserById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateUserByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundUsersId } = await repository.findUserById({
				query: { id: schemaArgs.params.id },
			});

			if (foundUsersId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updateUsersId } = await repository.updateUserById({
				query: { id: schemaArgs.params.id },
				args: schemaArgs.body,
			});

			if (updateUsersId.length === 0) {
				return response.status(404).json();
			}

			return response.status(201).location(`/users/${updateUsersId[0]}`).json();
		},
	};
};

export { UpdateUserByIdUseCase };
