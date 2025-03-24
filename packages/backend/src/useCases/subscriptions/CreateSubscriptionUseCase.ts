import type {
	CreateSubscriptionRequest,
	SubscriptionDTO,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreateSubscriptionUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		createSubscription: async ({
			schemaArgs: {
				body: { walletId, dossierId, bookId, chapterId, pageId },
			},
		}: UseCaseRequest<CreateSubscriptionRequest>): Promise<
			UseCaseResponse<Pick<SubscriptionDTO, "id">>
		> => {
			const { affectedIds: foundSubscriptionsId } =
				await repository.findSubscriptionsByWalletId({
					query: { walletId: walletId },
				});

			if (foundSubscriptionsId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdSubscriptionsId } =
				await repository.createSubscription({
					args: { walletId, dossierId, bookId, chapterId, pageId },
				});

			if (createdSubscriptionsId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				args: { id: createdSubscriptionsId[0] },
			};
		},
	};
};

export { CreateSubscriptionUseCase };
