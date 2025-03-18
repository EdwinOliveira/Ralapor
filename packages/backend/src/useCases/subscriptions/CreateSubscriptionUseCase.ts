import type { Request, Response } from "express";
import { createSubscriptionSchema } from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";

const CreateSubscriptionUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		createSubscription: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createSubscriptionSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundSubscriptionsId } =
				await repository.findSubscriptionsByWalletId({
					query: { walletId: schemaArgs.body.walletId },
				});

			if (foundSubscriptionsId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: createdSubscriptionsId } =
				await repository.createSubscription({
					args: schemaArgs.body,
				});

			if (createdSubscriptionsId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/subscriptions/${createdSubscriptionsId[0]}`)
				.json();
		},
	};
};

export { CreateSubscriptionUseCase };
