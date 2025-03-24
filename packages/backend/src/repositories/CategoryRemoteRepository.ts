import type { CategoryEntity, CategoryRepository } from "../domains/Category";
import { DatabaseService } from "../services/DatabaseService";

const CategoryRemoteRepository = (): CategoryRepository => {
	const { createConnection, createCategoryTable } = DatabaseService();

	return {
		findCategories: async () => {
			const dbConnection = createConnection();
			await createCategoryTable(dbConnection);

			const foundCategories = await dbConnection<CategoryEntity>("Categories");
			await dbConnection.destroy();

			if (foundCategories.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: foundCategories.map((foundCategory) => foundCategory.id),
				affectedRows: foundCategories,
			};
		},
		findCategoryById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createCategoryTable(dbConnection);

			const foundCategory = await dbConnection<CategoryEntity>("Categories")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (foundCategory === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [foundCategory.id],
				affectedRows: [foundCategory],
			};
		},
		findCategoryByDesignation: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createCategoryTable(dbConnection);

			const foundCategory = await dbConnection<CategoryEntity>("Categories")
				.where("designation", query?.designation)
				.first();

			await dbConnection.destroy();

			if (foundCategory === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [foundCategory.id],
				affectedRows: [foundCategory],
			};
		},
		createCategory: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createCategoryTable(dbConnection);

			const createdBook = await dbConnection<CategoryEntity>("Categories")
				.insert({ ...args })
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (createdBook === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdBook.id], affectedRows: [] };
		},
		updateCategoryById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createCategoryTable(dbConnection);

			const foundCategory = await dbConnection<CategoryEntity>("Categories")
				.where("id", query.id)
				.first();

			if (foundCategory === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedCategory = await dbConnection<CategoryEntity>("Categories")
				.where("id", query.id)
				.update({
					designation: args.designation || foundCategory.designation,
				})
				.returning("*")
				.first();

			await dbConnection.destroy();

			if (updatedCategory === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedCategory.id],
				affectedRows: [{ updatedAt: updatedCategory.updatedAt }],
			};
		},
	};
};

export { CategoryRemoteRepository };
