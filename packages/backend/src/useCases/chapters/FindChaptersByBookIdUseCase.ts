import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import {
	type ChapterDTO,
	chapterDTOMapper,
	type FindChaptersByBookIdRequest,
} from "../../domains/Chapter";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindChaptersByBookIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChaptersByBookId: async ({
			schemaArgs: {
				params: { bookId },
			},
		}: UseCaseRequest<FindChaptersByBookIdRequest>): Promise<
			UseCaseResponse<Array<ChapterDTO>>
		> => {
			const { affectedRows } = await repository.findChaptersByBookId({
				query: { bookId },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: affectedRows.map((affectedRow) => chapterDTOMapper(affectedRow)),
			};
		},
	};
};

export { FindChaptersByBookIdUseCase };
