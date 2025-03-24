import {
	type BookDTO,
	bookDTOMapper,
	type FindBookByIdRequest,
} from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindBookByIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBookById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindBookByIdRequest>): Promise<
			UseCaseResponse<BookDTO>
		> => {
			const { affectedRows } = await repository.findBookById({
				query: { id },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return { statusCode: 200, args: bookDTOMapper(affectedRows[0]) };
		},
	};
};

export { FindBookByIdUseCase };
