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
			const { affectedRows } = await repository.findPagesByCategoryId({
				query: { categoryId },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: affectedRows.map((affectedRow) => pageDTOMapper(affectedRow)),
			};
		},
	};
};

export { FindPagesByCategoryIdUseCase };
