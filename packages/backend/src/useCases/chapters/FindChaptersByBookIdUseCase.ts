import type { Request, Response } from "express";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import {
	chapterDTOMapper,
	findChaptersByBookIdSchema,
} from "../../domains/Chapter";

const FindChaptersByBookIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChaptersByBookId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findChaptersByBookIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findChaptersByBookId({
				query: { bookId: schemaArgs.params.bookId },
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

export { FindChaptersByBookIdUseCase };
