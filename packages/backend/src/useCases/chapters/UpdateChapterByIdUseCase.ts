import type {
	ChapterDTO,
	UpdateChapterByIdRequest,
} from "../../domains/Chapter";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateChapterByIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		updateChapterById: async ({
			schemaArgs: {
				params: { id },
				body: { designation, description, price, isVisible, isActive },
			},
		}: UseCaseRequest<UpdateChapterByIdRequest>): Promise<
			UseCaseResponse<Pick<ChapterDTO, "updatedAt">>
		> => {
			const { affectedIds: foundChaptersId } = await repository.findChapterById(
				{ query: { id } },
			);

			if (foundChaptersId.length === 0) {
				return { statusCode: 404 };
			}

			const {
				affectedIds: updatedChaptersId,
				affectedRows: updatedChapterRows,
			} = await repository.updateChapterById({
				query: { id },
				args: { designation, description, price, isVisible, isActive },
			});

			if (updatedChaptersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/chapters/${updatedChaptersId[0]}` },
				args: { updatedAt: updatedChapterRows[0].updatedAt },
			};
		},
	};
};

export { UpdateChapterByIdUseCase };
