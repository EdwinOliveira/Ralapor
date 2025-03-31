import type {
	CreateSubscriptionRequest,
	SubscriptionDTO,
} from "../../domains/Subscription";
import { SubscriptionRemoteRepository } from "../../repositories/SubscriptionRemoteRepository";
import { CreateSubscriptionAndRemoveFundsTransaction } from "../../transactions/CreateSubscriptionAndRemoveFundsTransaction";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";
import { FindBookByIdUseCase } from "../books/FindBookByIdUseCase";
import { FindChapterByIdUseCase } from "../chapters/FindChapterByIdUseCase";
import { FindDossierByIdUseCase } from "../dossiers/FindDossierByIdUseCase";
import { FindPageByIdUseCase } from "../pages/FindPageByIdUseCase";
import { FindWalletByIdUseCase } from "../wallets/FindWalletByIdUseCase";

const CreateSubscriptionUseCase = () => {
	const repository = SubscriptionRemoteRepository();
	const { createSubscriptionAndRemoveFunds } =
		CreateSubscriptionAndRemoveFundsTransaction();
	const { findDossierById } = FindDossierByIdUseCase();
	const { findBookById } = FindBookByIdUseCase();
	const { findChapterById } = FindChapterByIdUseCase();
	const { findPageById } = FindPageByIdUseCase();
	const { findWalletById } = FindWalletByIdUseCase();

	return {
		createSubscription: async ({
			schemaArgs: {
				body: { walletId, dossierId, bookId, chapterId, pageId },
			},
		}: UseCaseRequest<CreateSubscriptionRequest>): Promise<
			UseCaseResponse<Pick<SubscriptionDTO, "id">>
		> => {
			const { statusCode: walletStatusCode, args: walletArgs } =
				await findWalletById({ schemaArgs: { params: { id: walletId } } });

			if (walletStatusCode !== 200) {
				return { statusCode: 404 };
			}

			const { affectedIds: foundSubscriptionsId } =
				await repository.findSubscriptionsByWalletId({
					query: { walletId: walletId },
				});

			if (foundSubscriptionsId.length === 0) {
				return { statusCode: 404 };
			}

			const [
				{ statusCode: dossierStatusCode, args: dossierArgs },
				{ statusCode: bookStatusCode, args: bookArgs },
				{ statusCode: chapterStatusCode, args: chapterArgs },
				{ statusCode: pageStatusCode, args: pageArgs },
			] = await Promise.all([
				findDossierById({ schemaArgs: { params: { id: dossierId } } }),
				findBookById({ schemaArgs: { params: { id: bookId } } }),
				findChapterById({ schemaArgs: { params: { id: chapterId } } }),
				findPageById({ schemaArgs: { params: { id: pageId } } }),
			]);

			if (
				dossierStatusCode !== 200 ||
				bookStatusCode !== 200 ||
				chapterStatusCode !== 200 ||
				pageStatusCode !== 200
			) {
				return { statusCode: 404 };
			}

			const funds =
				dossierArgs?.price ||
				bookArgs?.price ||
				chapterArgs?.price ||
				pageArgs?.price;

			if (walletArgs === undefined || funds === undefined) {
				return { statusCode: 400 };
			}

			if (walletArgs.funds >= funds) {
				return { statusCode: 422 };
			}

			const { affectedIds: createdSubscriptionsId } =
				await createSubscriptionAndRemoveFunds({
					args: {
						walletId,
						dossierId,
						bookId,
						chapterId,
						pageId,
						funds,
					},
				});

			if (createdSubscriptionsId.length === 0) {
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
