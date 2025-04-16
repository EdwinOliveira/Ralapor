import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";
import type { CreateProfileRequest, ProfileDTO } from "../../domains/Profile";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";
import { FindUserByIdUseCase } from "../users/FindUserByIdUseCase";

const CreateProfileUseCase = () => {
	const repository = ProfileRemoteRepository();
	const { findUserById } = FindUserByIdUseCase();

	return {
		createProfile: async ({
			schemaArgs: {
				body: { userId, firstName, lastName, dateBirth },
			},
		}: UseCaseRequest<CreateProfileRequest>): Promise<
			UseCaseResponse<Pick<ProfileDTO, "id">>
		> => {
			const { statusCode: foundUserStatusCode } = await findUserById({
				schemaArgs: { params: { id: userId } },
			});

			if (foundUserStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { affectedIds: foundProfilesId } =
				await repository.findProfileByUserId({
					query: { userId },
				});

			if (foundProfilesId.length > 0) {
				return { statusCode: 409 };
			}

			const { affectedIds: createdProfilesId } = await repository.createProfile(
				{ args: { userId, firstName, lastName, dateBirth } },
			);

			if (createdProfilesId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdProfilesId[0] },
			};
		},
	};
};

export { CreateProfileUseCase };
