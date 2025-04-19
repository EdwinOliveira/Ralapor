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
				table.timestamps(true, true, true);
			});
		}
	};

	return {
		createConnection,
		createUsersTable,
	};
};

export { DatabaseService };
