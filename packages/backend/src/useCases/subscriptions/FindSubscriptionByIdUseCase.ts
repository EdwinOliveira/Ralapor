import {
	subscriptionDTOMapper,
	type FindSubscriptionByIdRequest,
	type SubscriptionDTO,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindSubscriptionByIdUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		findSubscriptionById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindSubscriptionByIdRequest>): Promise<
			UseCaseResponse<SubscriptionDTO>
		> => {
			const { affectedRows: foundSubscriptionsRow } =
				await repository.findSubscriptionById({
					query: { id },
				});

			if (foundSubscriptionsRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: subscriptionDTOMapper(foundSubscriptionsRow[0]),
			};
		},
	};
};

export { FindSubscriptionByIdUseCase };
