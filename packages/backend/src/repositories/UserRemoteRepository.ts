import type { UserEntity, UserRepository } from "../domains/User";
import { DatabaseService } from "../services/DatabaseService";

const UserRemoteRepository = (): UserRepository => {
	const { createConnection, createUsersTable } = DatabaseService();

	return {
		findUsers: async () => {
			const dbConnection = createConnection();
			await createUsersTable(dbConnection);

			const users = await dbConnection<UserEntity>("Users");
			await dbConnection.destroy();

			return {
				affectedIds: users.map((user) => user.id),
				affectedRows: users,
			};
		},
		findUserById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createUsersTable(dbConnection);

			const user = await dbConnection<UserEntity>("Users")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (user === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [user.id], affectedRows: [user] };
		},
		findUserByUsernameAndEmailAndPhoneNumber: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createUsersTable(dbConnection);

			const user = await dbConnection<UserEntity>("Users")
				.where("username", query.username)
				.and.where("email", query.email)
				.and.where("phoneNumber", query.phoneNumber)
				.first();

			await dbConnection.destroy();

			if (user === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [user.id], affectedRows: [user] };
		},
		findUserByUsernameOrEmailOrPhoneNumber: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createUsersTable(dbConnection);

			const user = await dbConnection<UserEntity>("Users")
				.where("username", query.username)
				.or.where("email", query.email)
				.or.where("phoneNumber", query.phoneNumber)
				.first();

			await dbConnection.destroy();

			if (user === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [user.id], affectedRows: [user] };
		},
	};
};

export { UserRemoteRepository };
