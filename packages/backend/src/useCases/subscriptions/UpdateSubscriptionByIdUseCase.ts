import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";
import type {
	SubscriptionDTO,
	UpdateSubscriptionByIdRequest,
} from "../../domains/Subscription";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateSubscriptionByIdUseCase = () => {
	const repository = SubscriptionRemoteRepository();

	return {
		updateSubscriptionById: async ({
			schemaArgs: {
				params: { id },
				body: { isActive },
			},
		}: UseCaseRequest<UpdateSubscriptionByIdRequest>): Promise<
			UseCaseResponse<Pick<SubscriptionDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundSubscriptionsId } =
				await repository.findSubscriptionById({
					query: { id },
				});

			if (foundSubscriptionsId.length === 0) {
				return { statusCode: 404 };
			}

			const {
				affectedIds: updatedSubscriptionsId,
				affectedRows: updatedSubscriptionsRow,
			} = await repository.updateSubscriptionById({
				query: { id },
				args: { isActive },
			});

			if (updatedSubscriptionsId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedSubscriptionsId[0],
					updatedAt: updatedSubscriptionsRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateSubscriptionByIdUseCase };
