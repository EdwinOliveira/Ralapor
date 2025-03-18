import type { PageEntity, PageRepository } from "../domains/Page";
import { DatabaseService } from "../services/DatabaseService";

const PageRemoteRepository = (): PageRepository => {
	const { createConnection, createPagesTable } = DatabaseService();

	return {
		findPageById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createPagesTable(dbConnection);

			const foundPage = await dbConnection<PageEntity>("Pages")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundPage === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundPage.id], affectedRows: [foundPage] };
		},
		findPagesByChapterId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createPagesTable(dbConnection);

			const foundPages = await dbConnection<PageEntity>("Pages").where(
				"chapterId",
				query.chapterId,
			);

			await dbConnection.destroy();

			if (foundPages.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: foundPages.map((foundPage) => foundPage.id),
				affectedRows: foundPages,
			};
		},
		createPage: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createPagesTable(dbConnection);

			const createdPage = await dbConnection<PageEntity>("Pages")
				.insert({ ...args, isVisible: true, isActive: true })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdPage === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdPage.id], affectedRows: [] };
		},
		updatePageById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createPagesTable(dbConnection);

			const foundPage = await dbConnection<PageEntity>("Pages")
				.where("id", query.id)
				.first();

			if (foundPage === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedProfile = await dbConnection<PageEntity>("Pages")
				.where("id", query.id)
				.update({
					designation: args.designation || foundPage.designation,
					description: args.description || foundPage.description,
					isVisible: args.isVisible || foundPage.isVisible,
					isActive: args.isActive || foundPage.isActive,
				})
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedProfile === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedProfile.id],
				affectedRows: [{ updatedAt: updatedProfile.updatedAt }],
			};
		},
	};
};

export { PageRemoteRepository };
