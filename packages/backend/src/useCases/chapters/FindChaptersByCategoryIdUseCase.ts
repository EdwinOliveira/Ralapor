import type { Request, Response } from "express";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import {
	chapterDTOMapper,
	findChaptersByCategoryIdSchema,
} from "../../domains/Chapter";

const FindChaptersByCategoryIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChaptersByCategoryId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findChaptersByCategoryIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findChaptersByCategoryId({
				query: { categoryId: schemaArgs.params.categoryId },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response.status(200).json({
				data: affectedRows.map((affectedRow) => chapterDTOMapper(affectedRow)),
			});
		},
	};
};

export { FindChaptersByCategoryIdUseCase };
