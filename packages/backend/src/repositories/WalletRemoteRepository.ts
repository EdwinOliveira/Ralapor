import type { WalletEntity, WalletRepository } from "../domains/Wallet";
import { DatabaseService } from "../services/DatabaseService";

const WalletRemoteRepository = (): WalletRepository => {
	const { createConnection, createWalletTable } = DatabaseService();

	return {
		findWalletById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createWalletTable(dbConnection);

			const foundWallet = await dbConnection<WalletEntity>("Wallets")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundWallet === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [foundWallet.id],
				affectedRows: [foundWallet],
			};
		},
		findWalletByUserId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createWalletTable(dbConnection);

			const foundWallets = await dbConnection<WalletEntity>("Wallets").where(
				"userId",
				query.userId,
			);

			await dbConnection.destroy();

			if (foundWallets.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: foundWallets.map((foundWallet) => foundWallet.id),
				affectedRows: foundWallets,
			};
		},
		createWallet: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createWalletTable(dbConnection);

			const createdWallet = await dbConnection<WalletEntity>("Wallets")
				.insert({ ...args, funds: 0, isActive: true })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdWallet === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdWallet.id], affectedRows: [] };
		},
		updateWalletById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createWalletTable(dbConnection);

			const foundWallet = await dbConnection<WalletEntity>("Wallets")
				.where("id", query.id)
				.first();

			if (foundWallet === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedWallet = await dbConnection<WalletEntity>("Wallets")
				.where("id", query.id)
				.update({
					funds: args.funds || foundWallet.funds,
					isActive: args.isActive || foundWallet.isActive,
				})
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedWallet === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedWallet.id],
				affectedRows: [{ updatedAt: updatedWallet.updatedAt }],
			};
		},
	};
};

export { WalletRemoteRepository };
