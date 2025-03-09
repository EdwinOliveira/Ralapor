import type { Request, Response } from "express";
import { pageDTOMapper, findPageByChapterIdSchema } from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";

const FindPageByChapterIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPageByChapterId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findPageByChapterIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findPageByChapterId({
				query: schemaArgs.params,
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: pageDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindPageByChapterIdUseCase };
