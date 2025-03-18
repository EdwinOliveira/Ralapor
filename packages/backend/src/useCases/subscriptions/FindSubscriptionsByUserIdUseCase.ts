import type { Request, Response } from "express";
import {
	subscriptionDTOMapper,
	findSubscriptionsByUserIdSchema,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";

const FindSubscriptionsByUserIdUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		findSubscriptionsByUserId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findSubscriptionsByUserIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findSubscriptionsByUserId({
				query: { userId: schemaArgs.params.userId },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response.status(200).json({
				data: affectedRows.map((affectedRow) =>
					subscriptionDTOMapper(affectedRow),
				),
			});
		},
	};
};

export { FindSubscriptionsByUserIdUseCase };
