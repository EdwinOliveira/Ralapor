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

	const destroyConnection = (connection: knex.Knex) => {
		return connection.destroy();
	};

	const createUsersTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Users");

		if (tableExists === false) {
			await connection.schema.createTable("Users", (table) => {
				table.increments("id").primary();
				table.integer("roleId").unsigned();
				table.foreign("roleId").references("id").inTable("Roles");
				table.string("username");
				table.string("email");
				table.string("phoneNumber");
				table.string("phoneNumberCode");
				table.string("accessCode");
				table.boolean("isTemporaryTerminated");
				table.boolean("isPermanentlyTerminated");
				table.timestamps(true, true, true);
			});
		}
	};

	const createRolesTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Roles");

		if (tableExists === false) {
			await connection.schema.createTable("Roles", (table) => {
				table.increments("id").primary();
				table.enum("designation", [
					"publisher",
					"consumer",
					"publisher-consumer",
				]);
				table.timestamps(true, true, true);
			});
		}
	};

	const createSubstancesTable = async (connection: knex.Knex) => {
		const tableExists = await connection.schema.hasTable("Substances");

		if (tableExists === false) {
			await connection.schema.createTable("Substances", (table) => {
				table.increments("id").primary();
				table.string("designation");
				table.enum("classification", ["fruits", "vegetables", "meat", "fish"]);
				table.timestamps(true, true, true);
			});
		}
	};

	return {
		createConnection,
		destroyConnection,
		createUsersTable,
		createRolesTable,
		createSubstancesTable,
	};
};

export { DatabaseService };
