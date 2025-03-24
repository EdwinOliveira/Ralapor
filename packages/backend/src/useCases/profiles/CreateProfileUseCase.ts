import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";
import {
	type CreateProfileRequest,
	createProfileSchema,
} from "../../domains/Profile";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreateProfileUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		createProfile: async ({
			schemaArgs: {
				body: { userId, firstName, lastName, dateBirth },
			},
		}: UseCaseRequest<CreateProfileRequest>): Promise<
			UseCaseResponse<unknown>
		> => {
			const { affectedIds: foundProfilesId } =
				await repository.findProfileByUserId({
					query: { userId },
				});

			if (foundProfilesId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdProfilesId } = await repository.createProfile(
				{ args: { userId, firstName, lastName, dateBirth } },
			);

			if (createdProfilesId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/profiles/${createdProfilesId[0]}` },
			};
		},
	};
};

export { CreateProfileUseCase };
