import {
	type FindProfileByIdRequest,
	type ProfileDTO,
	profileDTOMapper,
} from "../../domains/Profile";
import { ProfileRemoteRepository } from "../../repositories/ProfileRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindProfileByIdUseCase = () => {
	const repository = ProfileRemoteRepository();

	return {
		findProfileById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindProfileByIdRequest>): Promise<
			UseCaseResponse<ProfileDTO>
		> => {
			const { affectedRows } = await repository.findProfileById({
				query: { id },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return { statusCode: 200, args: profileDTOMapper(affectedRows[0]) };
		},
	};
};

export { FindProfileByIdUseCase };
