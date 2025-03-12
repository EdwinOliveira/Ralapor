import type { BookEntity, BookRepository } from "../domains/Book";
import { DatabaseService } from "../services/DatabaseService";

const BookRemoteRepository = (): BookRepository => {
	const { createConnection, createBooksTable } = DatabaseService();

	return {
		findBookById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createBooksTable(dbConnection);

			const foundBook = await dbConnection<BookEntity>("Books")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundBook === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundBook.id], affectedRows: [foundBook] };
		},
		findBookByDossierId: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createBooksTable(dbConnection);

			const foundBook = await dbConnection<BookEntity>("Books")
				.where("dossierId", query.dossierId)
				.first();

			await dbConnection.destroy();

			if (foundBook === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [foundBook.id], affectedRows: [foundBook] };
		},
		createBook: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createBooksTable(dbConnection);

			const createdBook = await dbConnection<BookEntity>("Books")
				.insert({ ...args, isVisible: true, isActive: true })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdBook === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdBook.id], affectedRows: [] };
		},
		updateBookById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createBooksTable(dbConnection);

			const foundBook = await dbConnection<BookEntity>("Books")
				.where("id", query.id)
				.first();

			if (foundBook === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedBook = await dbConnection<BookEntity>("Books")
				.where("id", query.id)
				.update({
					designation: args.designation || foundBook.designation,
					description: args.description || foundBook.description,
					isVisible: args.isVisible || foundBook.isVisible,
					isActive: args.isActive || foundBook.isActive,
				})
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedBook === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedBook.id],
				affectedRows: [{ updatedAt: updatedBook.updatedAt }],
			};
		},
	};
};

export { BookRemoteRepository };
