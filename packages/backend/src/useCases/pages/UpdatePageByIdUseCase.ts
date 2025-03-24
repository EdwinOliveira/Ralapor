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
			UseCaseResponse<Pick<PageDTO, "updatedAt">>
		> => {
			const { affectedIds: foundPagesId } = await repository.findPageById({
				query: { id },
			});

			if (foundPagesId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedPagesById, affectedRows: updatedPagesRow } =
				await repository.updatePageById({
					query: { id },
					args: { designation, description, price, isVisible, isActive },
				});

			if (updatedPagesById.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/pages/${updatedPagesById[0]}` },
				args: { updatedAt: updatedPagesRow[0].updatedAt },
			};
		},
	};
};

export { UpdatePageByIdUseCase };
