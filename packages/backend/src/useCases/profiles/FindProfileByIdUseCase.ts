import type { Request, Response } from "express";
import { findProfileByIdSchema, profileDTOMapper } from "../../domains/Profile";
import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";

const FindProfileByIdUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		findProfileById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findProfileByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findProfileById({
				query: { id: schemaArgs.params.id },
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

export { FindProfileByIdUseCase };
