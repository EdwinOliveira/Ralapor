import type { Request, Response } from "express";
import {
	subscriptionDTOMapper,
	findSubscriptionByIdSchema,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";

const FindSubscriptionByIdUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		findSubscriptionById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findSubscriptionByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findSubscriptionById({
				query: { id: schemaArgs.params.id },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: subscriptionDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindSubscriptionByIdUseCase };
