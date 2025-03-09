import type { Request, Response } from "express";
import { chapterDTOMapper, findChapterByIdSchema } from "../../domains/Chapter";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";

const FindChapterByIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChapterById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findChapterByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findChapterById({
				query: { id: schemaArgs.params.id },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: chapterDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindChapterByIdUseCase };
