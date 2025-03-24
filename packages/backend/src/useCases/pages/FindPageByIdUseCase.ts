import {
	type PageDTO,
	pageDTOMapper,
	type FindPageByIdRequest,
} from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindPageByIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPageById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindPageByIdRequest>): Promise<
			UseCaseResponse<PageDTO>
		> => {
			const { affectedRows: foundPagesRow } = await repository.findPageById({
				query: { id },
			});

			if (foundPagesRow.length === 0) {
				return { statusCode: 404 };
			}

			return { statusCode: 200, args: pageDTOMapper(foundPagesRow[0]) };
		},
	};
};

export { FindPageByIdUseCase };
