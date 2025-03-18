import type { Request, Response } from "express";
import { ChapterRemoteRepository } from "../../repositories/ChapterRemoteRepository";
import { createChapterSchema } from "../../domains/Chapter";

const CreateChapterUseCase = () => {
	const repository = ChapterRemoteRepository();

	return {
		createChapter: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createChapterSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundChaptersId } =
				await repository.findChaptersByBookId({
					query: { bookId: schemaArgs.body.bookId },
				});

			if (foundChaptersId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: createdChaptersId } = await repository.createChapter(
				{ args: schemaArgs.body },
			);

			if (createdChaptersId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/chapters/${createdChaptersId[0]}`)
				.json();
		},
	};
};

export { CreateChapterUseCase };
