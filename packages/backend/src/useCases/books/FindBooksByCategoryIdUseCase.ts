import {
	type BookDTO,
	bookDTOMapper,
	type FindBooksByCategoryIdRequest,
} from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindBooksByCategoryIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBooksByCategoryId: async ({
			schemaArgs: {
				params: { categoryId },
			},
		}: UseCaseRequest<FindBooksByCategoryIdRequest>): Promise<
			UseCaseResponse<Array<BookDTO>>
		> => {
			const { affectedRows: foundBooksId } =
				await repository.findBooksByCategoryId({
					query: { categoryId },
				});

			if (foundBooksId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: foundBooksId.map((foundBookId) => bookDTOMapper(foundBookId)),
			};
		},
	};
};

export { FindBooksByCategoryIdUseCase };
