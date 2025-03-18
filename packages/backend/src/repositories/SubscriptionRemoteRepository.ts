import type {
	SubscriptionEntity,
	SubscriptionRepository,
} from "../domains/Subscription";
import { DatabaseService } from "../services/DatabaseService";

const SubscriptionRemoteRepository = (): SubscriptionRepository => {
	const { createConnection, createSubscriptionTable } = DatabaseService();

	return {
		findSubscriptionById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSubscriptionTable(dbConnection);

			const foundSubscription = await dbConnection<SubscriptionEntity>(
				"Subscriptions",
			)
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundSubscription === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [foundSubscription.id],
				affectedRows: [foundSubscription],
			};
		},
		findSubscriptionsByWalletId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSubscriptionTable(dbConnection);

			const foundSubscriptions = await dbConnection<SubscriptionEntity>(
				"Subscriptions",
			).where("walletId", query.walletId);

			await dbConnection.destroy();

			if (foundSubscriptions.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: foundSubscriptions.map(
					(foundSubscription) => foundSubscription.id,
				),
				affectedRows: foundSubscriptions,
			};
		},
		createSubscription: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSubscriptionTable(dbConnection);

			const createdSubscription = await dbConnection<SubscriptionEntity>(
				"Subscriptions",
			)
				.insert({ ...args, isActive: true })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdSubscription === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdSubscription.id], affectedRows: [] };
		},
		updateSubscriptionById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSubscriptionTable(dbConnection);

			const foundSubscription = await dbConnection<SubscriptionEntity>(
				"Subscriptions",
			)
				.where("id", query.id)
				.first();

			if (foundSubscription === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedSubscription = await dbConnection<SubscriptionEntity>(
				"Subscriptions",
			)
				.where("id", query.id)
				.update({ isActive: args.isActive || foundSubscription.isActive })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedSubscription === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedSubscription.id],
				affectedRows: [{ updatedAt: updatedSubscription.updatedAt }],
			};
		},
	};
};

export { SubscriptionRemoteRepository };
