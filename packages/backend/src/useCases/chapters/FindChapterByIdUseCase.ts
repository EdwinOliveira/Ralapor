import {
	type ChapterDTO,
	chapterDTOMapper,
	type FindChapterByIdRequest,
} from "../../domains/Chapter";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindChapterByIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChapterById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindChapterByIdRequest>): Promise<
			UseCaseResponse<ChapterDTO>
		> => {
			const { affectedRows: foundChaptersId } =
				await repository.findChapterById({
					query: { id },
				});

			if (foundChaptersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: chapterDTOMapper(foundChaptersId[0]),
			};
		},
	};
};

export { FindChapterByIdUseCase };
