import { CategoryRemoteRepository } from "../../repositories/CategoryRemoteRepository";
import type {
	CategoryDTO,
	CreateCategoryRequest,
} from "../../domains/Category";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreateCategoryUseCase = () => {
	const repository = CategoryRemoteRepository();

	return {
		createCategory: async ({
			schemaArgs: {
				body: { designation },
			},
		}: UseCaseRequest<CreateCategoryRequest>): Promise<
			UseCaseResponse<Pick<CategoryDTO, "id">>
		> => {
			const { affectedIds: foundCategoriesId } =
				await repository.findCategoryByDesignation({
					query: { designation },
				});

			if (foundCategoriesId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdCategoriesId } =
				await repository.createCategory({
					args: { designation },
				});

			if (createdCategoriesId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				args: { id: createdCategoriesId[0] },
			};
		},
	};
};

export { CreateCategoryUseCase };
