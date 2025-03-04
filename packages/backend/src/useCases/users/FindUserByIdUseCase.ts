import type { Request, Response } from "express";
import { findUserByIdSchema, userDTOMapper } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";

const FindUserByIdUseCase = () => {
	const repository = UserRemoteRepository();

	return {
		findUserById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findUserByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findUserById({
				query: { id: schemaArgs.params.id },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: userDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindUserByIdUseCase };
