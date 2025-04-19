import type { SessionEntity, SessionRepository } from "../domains/Session";
import { DatabaseService } from "../services/DatabaseService";

const SessionRemoteRepository = (): SessionRepository => {
	const { createConnection, createSessionsTable } = DatabaseService();

	return {
		findSessionById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSessionsTable(dbConnection);

			const session = await dbConnection<SessionEntity>("Sessions")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (session === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [session.id], affectedRows: [session] };
		},
		findSessionByUserIdAndRoleId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSessionsTable(dbConnection);

			const session = await dbConnection<SessionEntity>("Sessions")
				.where("userId", query?.userId)
				.and.where("roleId", query?.roleId)
				.first();

			await dbConnection.destroy();

			if (session === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [session.id], affectedRows: [session] };
		},
		createSession: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSessionsTable(dbConnection);

			const createdSession = await dbConnection<SessionEntity>("Sessions")
				.insert(args)
				.returning("id");

			await dbConnection.destroy();

			if (createdSession.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdSession[0].id], affectedRows: [] };
		},
		updateSessionById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createSessionsTable(dbConnection);

			const foundSession = await dbConnection<SessionEntity>("Sessions")
				.where("id", query.id)
				.first();

			if (foundSession === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedSessions = await dbConnection<SessionEntity>("Sessions")
				.where("id", query.id)
				.update({
					expiresIn: args.expiresIn || foundSession.expiresIn,
					isExpired: args.isExpired || foundSession.isExpired,
				})
				.returning("*");

			await dbConnection.destroy();

			if (updatedSessions.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedSessions[0].id],
				affectedRows: [{ updatedAt: updatedSessions[0].updatedAt }],
			};
		},
	};
};

export { SessionRemoteRepository };
