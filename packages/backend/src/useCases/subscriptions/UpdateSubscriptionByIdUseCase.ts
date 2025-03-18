import type { Request, Response } from "express";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";
import { updateSubscriptionByIdSchema } from "../../domains/Subscription";

const UpdateSubscriptionByIdUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		updateSubscriptionById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateSubscriptionByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundSubscriptionsId } =
				await repository.findSubscriptionById({
					query: { id: schemaArgs.params.id },
				});

			if (foundSubscriptionsId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updateSubscriptionsById } =
				await repository.updateSubscriptionById({
					query: { id: schemaArgs.params.id },
					args: schemaArgs.body,
				});

			if (updateSubscriptionsById.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/subscriptions/${updateSubscriptionsById[0]}`)
				.json();
		},
	};
};

export { UpdateSubscriptionByIdUseCase };
