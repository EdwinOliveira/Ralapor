import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import type { CreateChapterRequest } from "../../domains/Chapter";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreateChapterUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		createChapter: async ({
			schemaArgs: {
				body: { bookId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreateChapterRequest>): Promise<
			UseCaseResponse<unknown>
		> => {
			const { affectedIds: foundChaptersId } =
				await repository.findChaptersByBookId({
					query: { bookId },
				});

			if (foundChaptersId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdChaptersId } = await repository.createChapter(
				{ args: { bookId, categoryId, designation, description, price } },
			);

			if (createdChaptersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/chapters/${createdChaptersId[0]}` },
			};
		},
	};
};

export { CreateChapterUseCase };
