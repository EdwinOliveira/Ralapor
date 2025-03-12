import type { ChapterEntity, ChapterRepository } from "../domains/Chapter";
import { DatabaseService } from "../services/DatabaseService";

const ChapterRemoteRepository = (): ChapterRepository => {
	const { createConnection, createChaptersTable } = DatabaseService();

	return {
		findChapterById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createChaptersTable(dbConnection);

			const foundChapter = await dbConnection<ChapterEntity>("Chapters")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundChapter === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundChapter.id], affectedRows: [foundChapter] };
		},
		findChapterByBookId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createChaptersTable(dbConnection);

			const foundChapter = await dbConnection<ChapterEntity>("Chapters")
				.where("bookId", query.bookId)
				.first();

			await dbConnection.destroy();

			if (foundChapter === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundChapter.id], affectedRows: [foundChapter] };
		},
		createChapter: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createChaptersTable(dbConnection);

			const createdChapter = await dbConnection<ChapterEntity>("Chapters")
				.insert({ ...args, isVisible: true, isActive: true })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdChapter === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdChapter.id], affectedRows: [] };
		},
		updateChapterById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createChaptersTable(dbConnection);

			const foundChapter = await dbConnection<ChapterEntity>("Chapters")
				.where("id", query.id)
				.first();

			if (foundChapter === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedChapter = await dbConnection<ChapterEntity>("Chapters")
				.where("id", query.id)
				.update({
					designation: args.designation || foundChapter.designation,
					description: args.description || foundChapter.description,
					isVisible: args.isVisible || foundChapter.isVisible,
					isActive: args.isActive || foundChapter.isActive,
				})
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedChapter === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedChapter.id],
				affectedRows: [{ updatedAt: updatedChapter.updatedAt }],
			};
		},
	};
};

export { ChapterRemoteRepository };
