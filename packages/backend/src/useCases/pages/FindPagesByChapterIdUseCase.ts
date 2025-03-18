import type { Request, Response } from "express";
import { pageDTOMapper, findPagesByChapterIdSchema } from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";

const FindPagesByChapterIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPagesByChapterId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findPagesByChapterIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findPagesByChapterId({
				query: schemaArgs.params,
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response.status(200).json({
				data: affectedRows.map((affectedRow) => pageDTOMapper(affectedRow)),
			});
		},
	};
};

export { FindPagesByChapterIdUseCase };
