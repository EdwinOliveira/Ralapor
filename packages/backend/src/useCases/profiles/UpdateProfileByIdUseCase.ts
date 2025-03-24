import type {
	ProfileDTO,
	UpdateProfileByIdRequest,
} from "../../domains/Profile";
import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateProfileByIdUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		updateProfileById: async ({
			schemaArgs: {
				params: { id },
				body: { firstName, lastName, dateBirth },
			},
		}: UseCaseRequest<UpdateProfileByIdRequest>): Promise<
			UseCaseResponse<Pick<ProfileDTO, "updatedAt">>
		> => {
			const { affectedIds: foundProfilesId } = await repository.findProfileById(
				{ query: { id } },
			);

			if (foundProfilesId.length === 0) {
				return { statusCode: 404 };
			}

			const {
				affectedIds: updatedProfilesId,
				affectedRows: updatedProfilesRow,
			} = await repository.updateProfileById({
				query: { id },
				args: { firstName, lastName, dateBirth },
			});

			if (updatedProfilesId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/profiles/${updatedProfilesId[0]}` },
				args: { updatedAt: updatedProfilesRow[0].updatedAt },
			};
		},
	};
};

export { UpdateProfileByIdUseCase };
