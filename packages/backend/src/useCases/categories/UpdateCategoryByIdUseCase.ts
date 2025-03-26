import type {
	CategoryDTO,
	UpdateCategoryByIdRequest,
} from "../../domains/Category";
import { CategoryRemoteRepository } from "../../repositories/CategoryRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateCategoryByIdUseCase = () => {
	const repository = CategoryRemoteRepository();

	return {
		updateCategoryById: async ({
			schemaArgs: {
				params: { id },
				body: { designation },
			},
		}: UseCaseRequest<UpdateCategoryByIdRequest>): Promise<
			UseCaseResponse<Pick<CategoryDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundCategoriesId } =
				await repository.findCategoryById({ query: { id } });

			if (foundCategoriesId.length === 0) {
				return { statusCode: 404 };
			}

			const {
				affectedIds: updatedCategoriesId,
				affectedRows: updatedCategoriesRow,
			} = await repository.updateCategoryById({
				query: { id },
				args: { designation },
			});

			if (updatedCategoriesId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedCategoriesId[0],
					updatedAt: updatedCategoriesRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateCategoryByIdUseCase };
