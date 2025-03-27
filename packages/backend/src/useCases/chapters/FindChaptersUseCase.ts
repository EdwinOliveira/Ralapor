import {
	type ChapterDTO,
	chapterDTOMapper,
	type FindChaptersRequest,
} from "../../domains/Chapter";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindChaptersUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChapters: async ({
			schemaArgs: {
				query: { minLimit, maxLimit },
			},
		}: UseCaseRequest<FindChaptersRequest>): Promise<
			UseCaseResponse<Array<ChapterDTO>>
		> => {
			const { affectedRows: foundChaptersRow } =
				await repository.findChapters();

			if (foundChaptersRow.length === 0) {
				return { statusCode: 404 };
			}

			const chapterDTOs = [];
			const minLimitValue = minLimit ?? 0;
			const maxLimitValue = maxLimit ?? foundChaptersRow.length;

			for (let i = minLimitValue; i < maxLimitValue; i++) {
				chapterDTOs.push(chapterDTOMapper(foundChaptersRow[i]));
			}

			return {
				statusCode: 200,
				args: chapterDTOs,
			};
		},
	};
};

export { FindChaptersUseCase };
