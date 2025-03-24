import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import type { BookDTO, UpdateBookByIdRequest } from "../../domains/Book";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateBookByIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		updateBookById: async ({
			schemaArgs: {
				params: { id },
				body: { designation, description, price, isVisible, isActive },
			},
		}: UseCaseRequest<UpdateBookByIdRequest>): Promise<
			UseCaseResponse<Pick<BookDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundBooksId } = await repository.findBookById({
				query: { id },
			});

			if (foundBooksId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedBooksId, affectedRows: updatedBooksRow } =
				await repository.updateBookById({
					query: { id },
					args: { designation, description, price, isVisible, isActive },
				});

			if (updatedBooksId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedBooksId[0],
					updatedAt: updatedBooksRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateBookByIdUseCase };
