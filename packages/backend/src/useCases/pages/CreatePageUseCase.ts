import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import type { CreatePageRequest, PageDTO } from "../../domains/Page";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreatePageUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		createPage: async ({
			schemaArgs: {
				body: { chapterId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreatePageRequest>): Promise<
			UseCaseResponse<Pick<PageDTO, "id">>
		> => {
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
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				args: { id: createdPagesId[0] },
			};
		},
	};
};

export { CreatePageUseCase };
