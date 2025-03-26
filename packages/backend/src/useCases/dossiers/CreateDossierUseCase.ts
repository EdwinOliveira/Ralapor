import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import type { CreateDossierRequest, DossierDTO } from "../../domains/Dossier";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";
import { FindUserByIdUseCase } from "../users/FindUserByIdUseCase";
import { FindCategoryByIdUseCase } from "../categories/FindCategoryByIdUseCase";

const CreateDossierUseCase = () => {
	const repository = DossierRemoteRepository();
	const { findUserById } = FindUserByIdUseCase();
	const { findCategoryById } = FindCategoryByIdUseCase();

	return {
		createDossier: async ({
			schemaArgs: {
				body: { userId, categoryId, designation, description, price },
			},
		}: UseCaseRequest<CreateDossierRequest>): Promise<
			UseCaseResponse<Pick<DossierDTO, "id">>
		> => {
			const { statusCode: foundUserStatusCode } = await findUserById({
				schemaArgs: { params: { id: userId } },
			});

			if (foundUserStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { statusCode: foundCategoryStatusCode } = await findCategoryById({
				schemaArgs: { params: { id: categoryId } },
			});

			if (foundCategoryStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { affectedIds: foundDossiersId } =
				await repository.findDossiersByUserId({
					query: { userId },
				});

			if (foundDossiersId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdDossiersId } = await repository.createDossier(
				{ args: { userId, categoryId, designation, description, price } },
			);

			if (createdDossiersId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdDossiersId[0] },
			};
		},
	};
};

export { CreateDossierUseCase };
