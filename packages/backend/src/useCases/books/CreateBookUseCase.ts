import { BookRemoteRepository } from "../../repositories/BookRemoteRepository";
import type { BookEntity, CreateBookRequest } from "../../domains/Book";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";
import { FindDossierByIdUseCase } from "../dossiers/FindDossierByIdUseCase";
import { FindCategoryByIdUseCase } from "../categories/FindCategoryByIdUseCase";

const CreateBookUseCase = () => {
	const repository = BookRemoteRepository();
	const { findDossierById } = FindDossierByIdUseCase();
	const { findCategoryById } = FindCategoryByIdUseCase();

	return {
		createBook: async ({
			schemaArgs: {
				body: { dossierId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreateBookRequest>): Promise<
			UseCaseResponse<Pick<BookEntity, "id">>
		> => {
			const { statusCode: foundDossierStatusCode } = await findDossierById({
				schemaArgs: { params: { id: dossierId } },
			});

			if (foundDossierStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { statusCode: foundCategoryStatusCode } = await findCategoryById({
				schemaArgs: { params: { id: categoryId } },
			});

			if (foundCategoryStatusCode !== 200) {
				return { statusCode: 404 };
			}

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
				args: { id: createdBooksId[0] },
			};
		},
	};
};

export { CreateBookUseCase };
