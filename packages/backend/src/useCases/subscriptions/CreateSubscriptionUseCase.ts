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
import { FindWalletByIdUseCase } from "../wallets/FindWalletByIdUseCase";
import { UpdateWalletByIdUseCase } from "../wallets/UpdateWalletByIdUseCase";

const CreateSubscriptionUseCase = () => {
	const repository = SubscriptionRemoteRepository();
	const { findDossierById } = FindDossierByIdUseCase();
	const { findBookById } = FindBookByIdUseCase();
	const { findChapterById } = FindChapterByIdUseCase();
	const { findPageById } = FindPageByIdUseCase();
	const { findWalletById } = FindWalletByIdUseCase();
	const { updateWalletById } = UpdateWalletByIdUseCase();

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

			const price =
				dossierArgs?.price ||
				bookArgs?.price ||
				chapterArgs?.price ||
				pageArgs?.price;

			if (walletArgs && price && walletArgs.funds >= price) {
				return { statusCode: 422 };
			}

			const { affectedIds: createdSubscriptionsId } =
				await repository.createSubscription({
					args: { walletId, dossierId, bookId, chapterId, pageId },
				});

			if (createdSubscriptionsId.length === 0) {
				return { statusCode: 404 };
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
