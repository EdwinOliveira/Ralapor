import type { Request, Response } from "express";
import { updateChapterByIdSchema } from "../../domains/Chapter";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";

const UpdateChapterByIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		updateChapterById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateChapterByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundChaptersId } = await repository.findChapterById(
				{ query: schemaArgs.params },
			);

			if (foundChaptersId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updateChaptersById } =
				await repository.updateChapterById({
					query: schemaArgs.params,
					args: schemaArgs.body,
				});

			if (updateChaptersById.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/Chapters/${updateChaptersById[0]}`)
				.json();
		},
	};
};

export { UpdateChapterByIdUseCase };
