import {
	type FindProfileByUserIdRequest,
	type ProfileDTO,
	profileDTOMapper,
} from "../../domains/Profile";
import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindProfileByUserIdUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		findProfileByUserId: async ({
			schemaArgs: {
				params: { userId },
			},
		}: UseCaseRequest<FindProfileByUserIdRequest>): Promise<
			UseCaseResponse<ProfileDTO>
		> => {
			const { affectedRows } = await repository.findProfileByUserId({
				query: { userId },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return { statusCode: 200, args: profileDTOMapper(affectedRows[0]) };
		},
	};
};

export { FindProfileByUserIdUseCase };
