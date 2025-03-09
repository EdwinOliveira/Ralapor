import type { Request, Response } from "express";
import { updateProfileByIdSchema } from "../../domains/Profile";
import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";

const UpdateProfileByIdUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		updateProfileById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateProfileByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundProfilesId } = await repository.findProfileById(
				{ query: { id: schemaArgs.params.id } },
			);

			if (foundProfilesId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updateProfilesById } =
				await repository.updateProfileById({
					query: { id: schemaArgs.params.id },
					args: schemaArgs.body,
				});

			if (updateProfilesById.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/profiles/${updateProfilesById[0]}`)
				.json();
		},
	};
};

export { UpdateProfileByIdUseCase };
