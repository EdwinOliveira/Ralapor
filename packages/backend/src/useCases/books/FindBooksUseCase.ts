import {
	type BookDTO,
	bookDTOMapper,
	type FindBooksRequest,
} from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindBooksUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBooks: async ({
			schemaArgs: {
				query: { minLimit, maxLimit },
			},
		}: UseCaseRequest<FindBooksRequest>): Promise<
			UseCaseResponse<Array<BookDTO>>
		> => {
			const { affectedRows: foundBooksRow } = await repository.findBooks();

			if (foundBooksRow.length === 0) {
				return { statusCode: 404 };
			}

			const bookDTOs = [];
			const minLimitValue = minLimit ?? 0;
			const maxLimitValue = maxLimit ?? foundBooksRow.length;

			for (let i = minLimitValue; i < maxLimitValue; i++) {
				bookDTOs.push(bookDTOMapper(foundBooksRow[i]));
			}

			return {
				statusCode: 200,
				args: bookDTOs,
			};
		},
	};
};

export { FindBooksUseCase };
