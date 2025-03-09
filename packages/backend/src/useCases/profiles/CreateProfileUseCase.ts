import type { Request, Response } from "express";
import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";
import { createProfileSchema } from "../../domains/Profile";

const CreateProfileUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		createProfile: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createProfileSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundProfilesId } =
				await repository.findProfileByUserId({
					query: { userId: schemaArgs.body.userId },
				});

			if (foundProfilesId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: createdProfilesId } = await repository.createProfile(
				{
					args: {
						userId: schemaArgs.body.userId,
						firstName: schemaArgs.body.firstName,
						lastName: schemaArgs.body.lastName,
						dateBirth: schemaArgs.body.dateBirth,
					},
				},
			);

			if (createdProfilesId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/profiles/${createdProfilesId[0]}`)
				.json();
		},
	};
};

export { CreateProfileUseCase };
