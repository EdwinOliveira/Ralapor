import type { Request, Response } from "express";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import {
	chapterDTOMapper,
	findChapterByBookIdSchema,
} from "../../domains/Chapter";

const FindChapterByBookIdUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		findChapterByBookId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findChapterByBookIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findChapterByBookId({
				query: { bookId: schemaArgs.params.bookId },
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

export { FindChapterByBookIdUseCase };
