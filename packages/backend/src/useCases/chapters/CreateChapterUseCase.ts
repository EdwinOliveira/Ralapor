import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import type { ChapterDTO, CreateChapterRequest } from "../../domains/Chapter";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";
import { FindBookByIdUseCase } from "../books/FindBookByIdUseCase";
import { FindCategoryByIdUseCase } from "../categories/FindCategoryByIdUseCase";

const CreateChapterUseCase = () => {
	const repository = ChapterRemoteRepository();
	const { findBookById } = FindBookByIdUseCase();
	const { findCategoryById } = FindCategoryByIdUseCase();

	return {
		createChapter: async ({
			schemaArgs: {
				body: { bookId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreateChapterRequest>): Promise<
			UseCaseResponse<Pick<ChapterDTO, "id">>
		> => {
			const { statusCode: foundBookStatusCode } = await findBookById({
				schemaArgs: { params: { id: bookId } },
			});

			if (foundBookStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { statusCode: foundCategoryStatusCode } = await findCategoryById({
				schemaArgs: { params: { id: categoryId } },
			});

			if (foundCategoryStatusCode !== 200) {
				return { statusCode: 404 };
			}

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
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdChaptersId[0] },
			};
		},
	};
};

export { CreateChapterUseCase };
