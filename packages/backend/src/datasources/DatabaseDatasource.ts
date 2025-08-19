import knex from 'knex';

const DatabaseDatasource = () => {
  const createConnection = () => {
    return knex({
      client: 'pg',
      connection: {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: Number.parseInt(process.env.DB_PORT ?? '5432'),
        user: process.env.DB_USER,
      },
    });
  };

  const destroyConnection = (connection: knex.Knex) => {
    return connection.destroy();
  };

  const createUsersTable = async (connection: knex.Knex) => {
    const tableExists = await connection.schema.hasTable('Users');

    if (tableExists === false) {
      await connection.schema.createTable('Users', (table) => {
        table.increments('id').primary();
        table.string('username');
        table.string('email');
        table.string('phoneNumber');
        table.string('phoneNumberCode');
        table.string('accessCode');
        table.timestamps(true, true, true);
      });
    }
  };

  const createRolesTable = async (connection: knex.Knex) => {
    const tableExists = await connection.schema.hasTable('Roles');

    if (tableExists === false) {
      await connection.schema.createTable('Roles', (table) => {
        table.increments('id').primary();
        table.string('designation');
        table.timestamps(true, true, true);
      });
    }
  };

  return {
    createConnection,
    createRolesTable,
    createUsersTable,
    destroyConnection,
  };
};

export { DatabaseDatasource };
