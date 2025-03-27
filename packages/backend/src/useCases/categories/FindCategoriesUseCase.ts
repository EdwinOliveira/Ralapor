import {
	type CategoryDTO,
	categoryDTOMapper,
	type FindCategoriesRequest,
} from "../../domains/Category";
import { CategoryRemoteRepository } from "../../repositories/CategoryRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindCategoriesUseCase = () => {
	const repository = CategoryRemoteRepository();

	return {
		findCategories: async ({
			schemaArgs: {
				query: { minLimit, maxLimit },
			},
		}: UseCaseRequest<FindCategoriesRequest>): Promise<
			UseCaseResponse<Array<CategoryDTO>>
		> => {
			const { affectedRows: foundCategoriesRow } =
				await repository.findCategories();

			if (foundCategoriesRow.length === 0) {
				return { statusCode: 404 };
			}

			const categoryDTOs = [];
			const minLimitValue = minLimit ?? 0;
			const maxLimitValue = maxLimit ?? foundCategoriesRow.length;

			for (let i = minLimitValue; i < maxLimitValue; i++) {
				categoryDTOs.push(categoryDTOMapper(foundCategoriesRow[i]));
			}

			return {
				statusCode: 200,
				args: categoryDTOs,
			};
		},
	};
};

export { FindCategoriesUseCase };
