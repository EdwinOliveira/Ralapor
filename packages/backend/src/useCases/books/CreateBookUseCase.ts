import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import type { CreateBookRequest } from "../../domains/Book";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreateBookUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		createBook: async ({
			schemaArgs: {
				body: { dossierId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreateBookRequest>): Promise<
			UseCaseResponse<unknown>
		> => {
			const { affectedIds: foundBooksId } =
				await repository.findBooksByDossierId({
					query: { dossierId },
				});

			if (foundBooksId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdBooksId } = await repository.createBook({
				args: { dossierId, categoryId, designation, description, price },
			});

			if (createdBooksId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/books/${createdBooksId[0]}` },
			};
		},
	};
};

export { CreateBookUseCase };
