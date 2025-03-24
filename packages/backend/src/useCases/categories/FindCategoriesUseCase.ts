import {
	type CategoryDTO,
	categoryDTOMapper,
	type FindCategoriesRequest,
} from "../../domains/Category";
import { CategoryRemoteRepository } from "../../repositories/CategoryRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindCategoryByIdUseCase = () => {
	const repository = CategoryRemoteRepository();

	return {
		findCategoryById: async ({
			schemaArgs,
		}: UseCaseRequest<FindCategoriesRequest>): Promise<
			UseCaseResponse<Array<CategoryDTO>>
		> => {
			const { affectedRows: foundCategoriesRow } =
				await repository.findCategories();

			if (foundCategoriesRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: foundCategoriesRow.map((foundCategoryRow) =>
					categoryDTOMapper(foundCategoryRow),
				),
			};
		},
	};
};

export { FindCategoryByIdUseCase };
