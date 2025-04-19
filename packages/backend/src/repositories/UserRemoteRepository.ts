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
		createUser: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createUsersTable(dbConnection);

			const createdUser = await dbConnection<UserEntity>("Users")
				.insert(args)
				.returning("id");

			await dbConnection.destroy();

			if (createdUser.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdUser[0].id], affectedRows: [] };
		},
		updateUserById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createUsersTable(dbConnection);

			const foundUser = await dbConnection<UserEntity>("Users")
				.where("id", query.id)
				.first();

			if (foundUser === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedUsers = await dbConnection<UserEntity>("Users")
				.where("id", query.id)
				.update({
					username: args.username || foundUser.username,
					email: args.email || foundUser.email,
					phoneNumber: args.phoneNumber || foundUser.phoneNumber,
					phoneNumberCode: args.phoneNumberCode || foundUser.phoneNumberCode,
					accessCode: args.accessCode || foundUser.accessCode,
				})
				.returning("*");

			await dbConnection.destroy();

			if (updatedUsers.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedUsers[0].id],
				affectedRows: [{ updatedAt: updatedUsers[0].updatedAt }],
			};
		},
	};
};

export { UserRemoteRepository };
