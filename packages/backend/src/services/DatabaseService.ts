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

	return { createConnection };
};

export { DatabaseService };
