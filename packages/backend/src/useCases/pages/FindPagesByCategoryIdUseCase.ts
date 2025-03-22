import type { Request, Response } from "express";
import { pageDTOMapper, findPagesByCategoryIdSchema } from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";

const FindPagesByCategoryIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPagesByCategoryId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findPagesByCategoryIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findPagesByCategoryId({
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

export { FindPagesByCategoryIdUseCase };
