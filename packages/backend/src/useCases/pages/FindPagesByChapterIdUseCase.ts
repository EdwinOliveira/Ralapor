import {
	pageDTOMapper,
	type FindPagesByChapterIdRequest,
	type PageDTO,
} from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindPagesByChapterIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPagesByChapterId: async ({
			schemaArgs: {
				params: { chapterId },
			},
		}: UseCaseRequest<FindPagesByChapterIdRequest>): Promise<
			UseCaseResponse<Array<PageDTO>>
		> => {
			const { affectedRows } = await repository.findPagesByChapterId({
				query: { chapterId },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: affectedRows.map((affectedRow) => pageDTOMapper(affectedRow)),
			};
		},
	};
};

export { FindPagesByChapterIdUseCase };
