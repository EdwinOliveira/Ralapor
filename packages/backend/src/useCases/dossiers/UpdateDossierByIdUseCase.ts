import type {
	DossierDTO,
	UpdateDossierByIdRequest,
} from "../../domains/Dossier";
import { DossierRemoteRepository } from "../../repositories/DossierRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateDossierByIdUseCase = () => {
	const repository = DossierRemoteRepository();

	return {
		updateDossierById: async ({
			schemaArgs: {
				params: { id },
				body: { designation, description, price, isVisible, isActive },
			},
		}: UseCaseRequest<UpdateDossierByIdRequest>): Promise<
			UseCaseResponse<Pick<DossierDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundDossiersId } = await repository.findDossierById(
				{ query: { id } },
			);

			if (foundDossiersId.length === 0) {
				return { statusCode: 404 };
			}

			const {
				affectedIds: updatedDossiersId,
				affectedRows: updatedDossiersRow,
			} = await repository.updateDossierById({
				query: { id },
				args: { designation, description, price, isVisible, isActive },
			});

			if (updatedDossiersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedDossiersId[0],
					updatedAt: updatedDossiersRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateDossierByIdUseCase };
