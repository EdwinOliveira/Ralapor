import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import type { CreatePageRequest, PageDTO } from "../../domains/Page";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";
import { FindChapterByIdUseCase } from "../chapters/FindChapterByIdUseCase";
import { FindCategoryByIdUseCase } from "../categories/FindCategoryByIdUseCase";

const CreatePageUseCase = () => {
	const repository = PageRemoteRepository();
	const { findChapterById } = FindChapterByIdUseCase();
	const { findCategoryById } = FindCategoryByIdUseCase();

	return {
		createPage: async ({
			schemaArgs: {
				body: { chapterId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreatePageRequest>): Promise<
			UseCaseResponse<Pick<PageDTO, "id">>
		> => {
			const { statusCode: foundChapterStatusCode } = await findChapterById({
				schemaArgs: { params: { id: chapterId } },
			});

			if (foundChapterStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { statusCode: foundCategoryStatusCode } = await findCategoryById({
				schemaArgs: { params: { id: categoryId } },
			});

			if (foundCategoryStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { affectedIds: foundPagesId } =
				await repository.findPagesByChapterId({
					query: { chapterId },
				});

			if (foundPagesId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdPagesId } = await repository.createPage({
				args: { chapterId, categoryId, designation, description, price },
			});

			if (createdPagesId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdPagesId[0] },
			};
		},
	};
};

export { CreatePageUseCase };
