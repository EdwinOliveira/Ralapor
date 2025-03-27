import {
	type PageDTO,
	pageDTOMapper,
	type FindPagesRequest,
} from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindPagesUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPages: async ({
			schemaArgs: {
				query: { minLimit, maxLimit },
			},
		}: UseCaseRequest<FindPagesRequest>): Promise<
			UseCaseResponse<Array<PageDTO>>
		> => {
			const { affectedRows: foundPagesRow } = await repository.findPages();

			if (foundPagesRow.length === 0) {
				return { statusCode: 404 };
			}

			const pageDTOs = [];
			const minLimitValue = minLimit ?? 0;
			const maxLimitValue = maxLimit ?? foundPagesRow.length;

			for (let i = minLimitValue; i < maxLimitValue; i++) {
				pageDTOs.push(pageDTOMapper(foundPagesRow[i]));
			}

			return {
				statusCode: 200,
				args: pageDTOs,
			};
		},
	};
};

export { FindPagesUseCase };
