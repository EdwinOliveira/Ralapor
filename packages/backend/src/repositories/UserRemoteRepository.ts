import type { UserEntity, UserRepository } from "../domains/User";
import { DatabaseDataSource } from "../dataSource/DatabaseDataSource";

const UserRemoteRepository = (): UserRepository => {
  const { createConnection, destroyConnection } = DatabaseDataSource();

  return {
    findUsers: async () => {
      const connection = createConnection();
      const users = await connection<UserEntity>("Users");
      await destroyConnection(connection);

      return {
        affectedIds: users.map((user) => user.id),
        affectedRows: users,
      };
    },
    findUserById: async ({ query }) => {
      if (query === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const user = await connection<UserEntity>("Users")
        .where("id", query?.id)
        .first();

      await destroyConnection(connection);

      if (user === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [user.id], affectedRows: [user] };
    },
    findUserByUsernameAndEmailAndPhoneNumber: async ({ query }) => {
      if (query === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const user = await connection<UserEntity>("Users")
        .where("username", query.username)
        .and.where("email", query.email)
        .and.where("phoneNumber", query.phoneNumber)
        .first();

      await destroyConnection(connection);

      if (user === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [user.id], affectedRows: [user] };
    },
    findUserByUsernameOrEmailOrPhoneNumber: async ({ query }) => {
      if (query === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const user = await connection<UserEntity>("Users")
        .where("username", query.username)
        .or.where("email", query.email)
        .or.where("phoneNumber", query.phoneNumber)
        .first();

      await destroyConnection(connection);

      if (user === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [user.id], affectedRows: [user] };
    },
    createUser: async ({ args }) => {
      if (args === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const createdUser = await connection<UserEntity>("Users")
        .insert({
          ...args,
          isTemporaryTerminated: false,
          isPermanentlyTerminated: false,
        })
        .returning("id");

      await destroyConnection(connection);

      if (createdUser.length === 0) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [createdUser[0].id], affectedRows: [] };
    },
    updateUserById: async ({ query, args }) => {
      if (query === undefined || args === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const foundUser = await connection<UserEntity>("Users")
        .where("id", query.id)
        .first();

      if (foundUser === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const updatedUsers = await connection<UserEntity>("Users")
        .where("id", query.id)
        .update({
          username: args.username || foundUser.username,
          email: args.email || foundUser.email,
          phoneNumber: args.phoneNumber || foundUser.phoneNumber,
          phoneNumberCode: args.phoneNumberCode || foundUser.phoneNumberCode,
          accessCode: args.accessCode || foundUser.accessCode,
          isTemporaryTerminated:
            args.isTemporaryTerminated || foundUser.isTemporaryTerminated,
          isPermanentlyTerminated:
            args.isPermanentlyTerminated || foundUser.isPermanentlyTerminated,
        })
        .returning("*");

      await destroyConnection(connection);

      if (updatedUsers.length === 0) {
        return { affectedIds: [], affectedRows: [] };
      }

      return {
        affectedIds: [updatedUsers[0].id],
        affectedRows: updatedUsers,
      };
    },
  };
};

export { UserRemoteRepository };
