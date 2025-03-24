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
			const { affectedRows } = await repository.findBooksByDossierId({
				query: { dossierId },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: affectedRows.map((affectedRow) => bookDTOMapper(affectedRow)),
			};
		},
	};
};

export { FindBooksByDossierIdUseCase };
