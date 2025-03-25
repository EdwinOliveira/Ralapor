import type {
	CreateSubscriptionRequest,
	SubscriptionDTO,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";
import { FindBookByIdUseCase } from "../books/FindBookByIdUseCase";
import { FindChapterByIdUseCase } from "../chapters/FindChapterByIdUseCase";
import { FindDossierByIdUseCase } from "../dossiers/FindDossierByIdUseCase";
import { FindPageByIdUseCase } from "../pages/FindPageByIdUseCase";
import { UpdateWalletByIdUseCase } from "../wallets/UpdateWalletByIdUseCase";

const CreateSubscriptionUseCase = () => {
	const repository = SubscriptionRemoteRepository();
	const { findDossierById } = FindDossierByIdUseCase();
	const { findBookById } = FindBookByIdUseCase();
	const { findChapterById } = FindChapterByIdUseCase();
	const { findPageById } = FindPageByIdUseCase();
	const { updateWalletById } = UpdateWalletByIdUseCase();

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

			let price = 0;

			if (dossierId !== undefined) {
				const { statusCode, args } = await findDossierById({
					schemaArgs: { params: { id: dossierId } },
				});

				if (statusCode === 200 && args !== undefined) {
					price += args.price;
				}
			}

			if (bookId !== undefined) {
				const { statusCode, args } = await findBookById({
					schemaArgs: { params: { id: bookId } },
				});

				if (statusCode === 200 && args !== undefined) {
					price += args.price;
				}
			}

			if (chapterId !== undefined) {
				const { statusCode, args } = await findChapterById({
					schemaArgs: { params: { id: chapterId } },
				});

				if (statusCode === 200 && args !== undefined) {
					price += args.price;
				}
			}

			if (pageId !== undefined) {
				const { statusCode, args } = await findPageById({
					schemaArgs: { params: { id: pageId } },
				});

				if (statusCode === 200 && args !== undefined) {
					price += args.price;
				}
			}

			const { statusCode } = await updateWalletById({
				schemaArgs: { params: { id: walletId }, body: { funds: price } },
			});

			if (statusCode !== 201) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdSubscriptionsId[0] },
			};
		},
	};
};

export { CreateSubscriptionUseCase };
