import type { Request, Response } from "express";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";
import { createPageSchema } from "../../domains/Page";

const CreatePageUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		createPage: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createPageSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundPagesId } =
				await repository.findPageByChapterId({
					query: { chapterId: schemaArgs.body.chapterId },
				});

			if (foundPagesId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: createdPagesId } = await repository.createPage({
				args: {
					chapterId: schemaArgs.body.chapterId,
					designation: schemaArgs.body.designation,
					description: schemaArgs.body.description,
				},
			});

			if (createdPagesId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/pages/${createdPagesId[0]}`)
				.json();
		},
	};
};

export { CreatePageUseCase };
