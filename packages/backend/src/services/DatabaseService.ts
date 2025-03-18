import knex from "knex";

const DatabaseService = () => {
	const createConnection = () => {
		return knex({
			client: "pg",
			connection: {
				host: process.env.DB_HOST,
				port: Number.parseInt(process.env.DB_PORT ?? "5432"),
				user: process.env.DB_USER,
				database: process.env.DB_NAME,
				password: process.env.DB_PASSWORD,
			},
		});
	};

	const createUsersTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Users");

		if (tableExists === false) {
			await connection.schema.createTable("Users", (table) => {
				table.increments("id").primary();
				table.string("username");
				table.string("email");
				table.string("phoneNumber");
				table.string("phoneNumberCode");
				table.string("accessCode");
				table.string("accessToken");
				table.string("refreshToken");
				table.timestamps(true, true, true);
			});
		}
	};

	const createProfilesTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Profiles");

		if (tableExists === false) {
			await connection.schema.createTable("Profiles", (table) => {
				table.increments("id").primary();
				table.integer("userId");
				table.string("firstName");
				table.string("lastName");
				table.date("dateBirth");
				table.timestamps(true, true, true);
			});
		}
	};

	const createDossiersTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Dossiers");

		if (tableExists === false) {
			await connection.schema.createTable("Dossiers", (table) => {
				table.increments("id").primary();
				table.integer("userId");
				table.string("designation");
				table.string("description");
				table.boolean("isVisible");
				table.boolean("isActive");
				table.timestamps(true, true, true);
			});
		}
	};

	const createBooksTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Books");

		if (tableExists === false) {
			await connection.schema.createTable("Books", (table) => {
				table.increments("id").primary();
				table.integer("dossierId");
				table.string("designation");
				table.string("description");
				table.boolean("isVisible");
				table.boolean("isActive");
				table.timestamps(true, true, true);
			});
		}
	};

	const createChaptersTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Chapters");

		if (tableExists === false) {
			await connection.schema.createTable("Chapters", (table) => {
				table.increments("id").primary();
				table.integer("bookId");
				table.string("designation");
				table.string("description");
				table.boolean("isVisible");
				table.boolean("isActive");
				table.timestamps(true, true, true);
			});
		}
	};

	const createPagesTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Pages");

		if (tableExists === false) {
			await connection.schema.createTable("Pages", (table) => {
				table.increments("id").primary();
				table.integer("chapterId");
				table.string("designation");
				table.string("description");
				table.boolean("isVisible");
				table.boolean("isActive");
				table.timestamps(true, true, true);
			});
		}
	};

	const createSubscriptionTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Subscriptions");

		if (tableExists === false) {
			await connection.schema.createTable("Subscriptions", (table) => {
				table.increments("id").primary();
				table.integer("walletId");
				table.integer("dossierId");
				table.integer("bookId");
				table.integer("chapterId");
				table.integer("pageId");
				table.boolean("isActive");
				table.timestamps(true, true, true);
			});
		}
	};

	const createWalletTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Wallets");

		if (tableExists === false) {
			await connection.schema.createTable("Wallets", (table) => {
				table.increments("id").primary();
				table.integer("userId");
				table.integer("funds");
				table.boolean("isActive");
				table.timestamps(true, true, true);
			});
		}
	};

	return {
		createConnection,
		createUsersTable,
		createProfilesTable,
		createDossiersTable,
		createBooksTable,
		createChaptersTable,
		createPagesTable,
		createSubscriptionTable,
		createWalletTable,
	};
};

export { DatabaseService };
