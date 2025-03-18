import type { Request, Response } from "express";
import {
	subscriptionDTOMapper,
	findSubscriptionsByWalletIdSchema,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";

const FindSubscriptionsByWalletIdUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		findSubscriptionsByWalletId: async (
			request: Request,
			response: Response,
		) => {
			const { data: schemaArgs, error: schemaErrors } =
				findSubscriptionsByWalletIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findSubscriptionsByWalletId({
				query: { walletId: schemaArgs.params.walletId },
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

export { FindSubscriptionsByWalletIdUseCase };
