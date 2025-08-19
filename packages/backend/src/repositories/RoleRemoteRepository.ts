import type { RoleEntity, RoleRepository } from '../domains/Role';

import { DatabaseDataSource } from '../dataSource/DatabaseDataSource';

const RoleRemoteRepository = (): RoleRepository => {
  const { createConnection, destroyConnection } = DatabaseDataSource();

  return {
    createRole: async ({ args }) => {
      if (args === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const createdRole = await connection<RoleEntity>('Roles')
        .insert(args)
        .returning('id');

      await destroyConnection(connection);

      if (createdRole.length === 0) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [createdRole[0].id], affectedRows: [] };
    },
    findRoleByDesignation: async ({ query }) => {
      if (query === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const role = await connection<RoleEntity>('Roles')
        .where('designation', query?.designation)
        .first();

      await destroyConnection(connection);

      if (role === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [role.id], affectedRows: [role] };
    },
    findRoleById: async ({ query }) => {
      if (query === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const role = await connection<RoleEntity>('Roles')
        .where('id', query?.id)
        .first();

      await destroyConnection(connection);

      if (role === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      return { affectedIds: [role.id], affectedRows: [role] };
    },
    findRoles: async () => {
      const connection = createConnection();
      const roles = await connection<RoleEntity>('Roles');
      await destroyConnection(connection);

      return {
        affectedIds: roles.map((role) => role.id),
        affectedRows: roles,
      };
    },
    updateRoleById: async ({ args, query }) => {
      if (query === undefined || args === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const connection = createConnection();

      const foundRole = await connection<RoleEntity>('Roles')
        .where('id', query.id)
        .first();

      if (foundRole === undefined) {
        return { affectedIds: [], affectedRows: [] };
      }

      const updatedRoles = await connection<RoleEntity>('Roles')
        .where('id', query.id)
        .update({
          designation: args.designation || foundRole.designation,
        })
        .returning('*');

      await destroyConnection(connection);

      if (updatedRoles.length === 0) {
        return { affectedIds: [], affectedRows: [] };
      }

      return {
        affectedIds: [updatedRoles[0].id],
        affectedRows: [{ updatedAt: updatedRoles[0].updatedAt }],
      };
    },
  };
};

export { RoleRemoteRepository };
