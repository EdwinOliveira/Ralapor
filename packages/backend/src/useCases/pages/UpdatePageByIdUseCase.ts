import type { Request, Response } from "express";
import { updatePageByIdSchema } from "../../domains/Page";
import { PageRemoteRepository } from "../../repositories/PageRemoteRepository";

const UpdatePageByIdUseCase = () => {
	const repository = PageRemoteRepository();

	return {
		updatePageById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updatePageByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundPagesId } = await repository.findPageById({
				query: { id: schemaArgs.params.id },
			});

			if (foundPagesId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updatePagesById } = await repository.updatePageById({
				query: schemaArgs.params,
				args: schemaArgs.body,
			});

			if (updatePagesById.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/pages/${updatePagesById[0]}`)
				.json();
		},
	};
};

export { UpdatePageByIdUseCase };
