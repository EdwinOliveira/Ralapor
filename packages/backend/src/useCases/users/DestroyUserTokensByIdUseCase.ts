import type { Request, Response } from "express";
import { destroyUserTokensByIdSchema } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";

const DestroyUserTokensByIdUseCase = () => {
	const repository = UserRemoteRepository();

	return {
		destroyUserTokensById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				destroyUserTokensByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundUsersId, affectedRows: foundUsers } =
				await repository.findUserById({
					query: { id: schemaArgs.params.id },
				});

			if (foundUsersId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds } = await repository.updateUserById({
				args: { accessToken: undefined, refreshToken: undefined },
			});

			if (affectedIds.length === 0) {
				return response.status(404).json();
			}

			return response.status(204).json();
		},
	};
};

export { DestroyUserTokensByIdUseCase };
