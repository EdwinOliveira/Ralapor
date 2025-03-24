import {
	type BookDTO,
	bookDTOMapper,
	type FindBooksByDossierIdRequest,
} from "../../domains/Book";
import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindBooksByDossierIdUseCase = () => {
	const repository = BookRemoteRepository();

	return {
		findBooksByDossierId: async ({
			schemaArgs: {
				params: { dossierId },
			},
		}: UseCaseRequest<FindBooksByDossierIdRequest>): Promise<
			UseCaseResponse<Array<BookDTO>>
		> => {
			const { affectedRows: foundBooksId } =
				await repository.findBooksByDossierId({
					query: { dossierId },
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

export { FindBooksByDossierIdUseCase };
