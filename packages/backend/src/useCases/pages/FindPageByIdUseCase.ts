import type { Request, Response } from "express";
import { pageDTOMapper, findPageByIdSchema } from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";

const FindPageByIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		findPageById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findPageByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findPageById({
				query: { id: schemaArgs.params.id },
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

export { FindPageByIdUseCase };
