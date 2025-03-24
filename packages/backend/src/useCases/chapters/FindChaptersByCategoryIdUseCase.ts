import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import {
	type ChapterDTO,
	chapterDTOMapper,
	type FindChaptersByCategoryIdRequest,
} from "../../domains/Chapter";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindChaptersByCategoryIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChaptersByCategoryId: async ({
			schemaArgs: {
				params: { categoryId },
			},
		}: UseCaseRequest<FindChaptersByCategoryIdRequest>): Promise<
			UseCaseResponse<Array<ChapterDTO>>
		> => {
			const { affectedRows: foundChaptersId } =
				await repository.findChaptersByCategoryId({
					query: { categoryId },
				});

			if (foundChaptersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: foundChaptersId.map((foundChapterId) =>
					chapterDTOMapper(foundChapterId),
				),
			};
		},
	};
};

export { FindChaptersByCategoryIdUseCase };
