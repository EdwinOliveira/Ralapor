import {
	subscriptionDTOMapper,
	type FindSubscriptionsByWalletIdRequest,
	type SubscriptionDTO,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindSubscriptionsByWalletIdUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		findSubscriptionsByWalletId: async ({
			schemaArgs: {
				params: { walletId },
			},
		}: UseCaseRequest<FindSubscriptionsByWalletIdRequest>): Promise<
			UseCaseResponse<Array<SubscriptionDTO>>
		> => {
			const { affectedRows: foundSubscriptionsRow } =
				await repository.findSubscriptionsByWalletId({
					query: { walletId },
				});

			if (foundSubscriptionsRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: foundSubscriptionsRow.map((foundSubscriptionRow) =>
					subscriptionDTOMapper(foundSubscriptionRow),
				),
			};
		},
	};
};

export { FindSubscriptionsByWalletIdUseCase };
