import type { Request, Response } from "express";
import {
	findProfileByUserIdSchema,
	profileDTOMapper,
} from "../../domains/Profile";
import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";

const FindProfileByUserIdUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		findProfileByUserId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findProfileByUserIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findProfileByUserId({
				query: { userId: schemaArgs.params.userId },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: profileDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindProfileByUserIdUseCase };
