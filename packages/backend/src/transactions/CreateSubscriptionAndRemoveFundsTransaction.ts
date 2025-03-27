import { SubscriptionRemoteRepository } from "../repositories/SubscriptionRemoteRepository";
import { WalletRemoteRepository } from "../repositories/WalletRemoteRepository";
import { DatabaseService } from "../services/DatabaseService";
import type {
	TransactionRequest,
	TransactionResponse,
} from "../types/Transaction";

type TransactionRequestArgs = {
	walletId: number;
	dossierId: number;
	bookId: number;
	chapterId: number;
	pageId: number;
	funds: number;
};

const CreateSubscriptionAndRemoveFundsTransaction = () => {
	const { createConnection } = DatabaseService();
	const { createSubscription } = SubscriptionRemoteRepository();
	const { updateWalletById } = WalletRemoteRepository();

	return {
		createSubscriptionAndRemoveFunds: ({
			args,
		}: TransactionRequest<TransactionRequestArgs>): Promise<
			TransactionResponse<unknown>
		> => {
			const dbConnection = createConnection();

			return dbConnection.transaction(async (trx) => {
				const { affectedIds: updatedWalletsId } = await updateWalletById({
					query: { id: args.walletId },
					args: { funds: args.funds },
				});

				if (updatedWalletsId.length === 0) {
					trx.rollback;
					return { affectedIds: [], affectedRows: [] };
				}

				const { affectedIds: createdSubscriptionsId } =
					await createSubscription({
						args: {
							walletId: args.walletId,
							dossierId: args.dossierId,
							bookId: args.bookId,
							chapterId: args.chapterId,
							pageId: args.pageId,
						},
					});

				if (createdSubscriptionsId.length === 0) {
					trx.rollback;
					return { affectedIds: [], affectedRows: [] };
				}

				trx.commit;

				return { affectedIds: [createdSubscriptionsId[0]], affectedRows: [] };
			});
		},
	};
};

export { CreateSubscriptionAndRemoveFundsTransaction };
