import {
	type PageDTO,
	pageDTOMapper,
	type FindPagesByCategoryIdRequest,
} from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindPagesByCategoryIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPagesByCategoryId: async ({
			schemaArgs: {
				params: { categoryId },
			},
		}: UseCaseRequest<FindPagesByCategoryIdRequest>): Promise<
			UseCaseResponse<Array<PageDTO>>
		> => {
			const { affectedRows: foundPagesRow } =
				await repository.findPagesByCategoryId({
					query: { categoryId },
				});

			if (foundPagesRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: foundPagesRow.map((foundPageRow) => pageDTOMapper(foundPageRow)),
			};
		},
	};
};

export { FindPagesByCategoryIdUseCase };
