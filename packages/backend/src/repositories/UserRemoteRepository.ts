import { DatabaseDatasource } from '../datasources/DatabaseDatasource';
import { UserEntity, UserRepository } from '../domains/user';

const UserRemoteRepository = (): UserRepository => {
  const { createConnection, destroyConnection } = DatabaseDatasource();

  return {
    createUser: async ({ queryArgs }) => {
      if (queryArgs === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const createdUser = await connection<UserEntity>('Users')
        .insert(queryArgs)
        .returning('id');

      await destroyConnection(connection);

      if (createdUser.length === 0) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [createdUser[0].id], affectedRows: [] };
    },
    findUserById: async ({ queryParams }) => {
      if (queryParams === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const user = await connection<UserEntity>('Users')
        .where('id', queryParams.id)
        .first();

      await destroyConnection(connection);

      if (user === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [user.id], affectedRows: [user] };
    },
    findUserByUsernameOrEmailOrPhoneNumber: async ({ queryParams }) => {
      if (queryParams === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const user = await connection<UserEntity>('Users')
        .where('username', queryParams.username)
        .or.where('email', queryParams.email)
        .or.where('phoneNumber', queryParams.phoneNumber)
        .first();

      await destroyConnection(connection);

      if (user === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [user.id], affectedRows: [user] };
    },
    updateUserById: async ({ queryArgs, queryParams }) => {
      if (queryArgs === undefined || queryParams === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const updatedUser = await connection<UserEntity>('Users')
        .where('id', queryParams.id)
        .update(queryArgs)
        .returning('id');

      await destroyConnection(connection);

      if (updatedUser.length === 0) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [updatedUser[0].id], affectedRows: [] };
    },
  };
};

export { UserRemoteRepository };
