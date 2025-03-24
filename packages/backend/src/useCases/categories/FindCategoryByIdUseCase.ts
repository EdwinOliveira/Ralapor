import {
	type CategoryDTO,
	categoryDTOMapper,
	type FindCategoryByIdRequest,
} from "../../domains/Category";
import { CategoryRemoteRepository } from "../../repositories/CategoryRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindCategoryByIdUseCase = () => {
	const repository = CategoryRemoteRepository();

	return {
		findCategoryById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindCategoryByIdRequest>): Promise<
			UseCaseResponse<CategoryDTO>
		> => {
			const { affectedRows: foundCategoriesId } =
				await repository.findCategoryById({
					query: { id },
				});

			if (foundCategoriesId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: categoryDTOMapper(foundCategoriesId[0]),
			};
		},
	};
};

export { FindCategoryByIdUseCase };
