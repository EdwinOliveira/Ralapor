import type { PageDTO, UpdatePageByIdRequest } from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdatePageByIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		updatePageById: async ({
			schemaArgs: {
				params: { id },
				body: { designation, description, price, isVisible, isActive },
			},
		}: UseCaseRequest<UpdatePageByIdRequest>): Promise<
			UseCaseResponse<Pick<PageDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundPagesId } = await repository.findPageById({
				query: { id },
			});

			if (foundPagesId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedPagesId, affectedRows: updatedPagesRow } =
				await repository.updatePageById({
					query: { id },
					args: { designation, description, price, isVisible, isActive },
				});

			if (updatedPagesId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedPagesId[0],
					updatedAt: updatedPagesRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdatePageByIdUseCase };
