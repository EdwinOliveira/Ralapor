import type { SessionEntity, SessionRepository } from "../domains/Session";
import type { HttpContext } from "../signatures/HttpContext";

const SessionRemoteRepository = ({
	services: {
		databaseService: { createConnection, destroyConnection },
	},
}: HttpContext): SessionRepository => {
	return {
		findSessionById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();
			const session = await connection<SessionEntity>("Sessions")
				.where("id", query?.id)
				.first();

			await destroyConnection(connection);

			if (session === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [session.id], affectedRows: [session] };
		},
		findSessionByUserIdAndRoleId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();
			const session = await connection<SessionEntity>("Sessions")
				.where("userId", query?.userId)
				.and.where("roleId", query?.roleId)
				.first();

			await destroyConnection(connection);

			if (session === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [session.id], affectedRows: [session] };
		},
		createSession: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();
			const createdSession = await connection<SessionEntity>("Sessions")
				.insert(args)
				.returning("id");

			await destroyConnection(connection);

			if (createdSession.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdSession[0].id], affectedRows: [] };
		},
		updateSessionById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const foundSession = await connection<SessionEntity>("Sessions")
				.where("id", query.id)
				.first();

			if (foundSession === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedSessions = await connection<SessionEntity>("Sessions")
				.where("id", query.id)
				.update({
					isTerminated: args.isTerminated || foundSession.isTerminated,
				})
				.returning("*");

			await destroyConnection(connection);

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
