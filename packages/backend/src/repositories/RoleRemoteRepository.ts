import type { RoleEntity, RoleRepository } from "../domains/Role";
import { DatabaseService } from "../services/DatabaseService";

const RoleRemoteRepository = (): RoleRepository => {
	const { createConnection, createRolesTable } = DatabaseService();

	return {
		findRoles: async () => {
			const dbConnection = createConnection();
			await createRolesTable(dbConnection);

			const roles = await dbConnection<RoleEntity>("Roles");
			await dbConnection.destroy();

			return {
				affectedIds: roles.map((role) => role.id),
				affectedRows: roles,
			};
		},
		findRoleByDesignation: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createRolesTable(dbConnection);

			const role = await dbConnection<RoleEntity>("Roles")
				.where("designation", query?.designation)
				.first();

			await dbConnection.destroy();

			if (role === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [role.id], affectedRows: [role] };
		},
		findRoleById: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createRolesTable(dbConnection);

			const role = await dbConnection<RoleEntity>("Roles")
				.where("id", query?.id)
				.first();

			await dbConnection.destroy();

			if (role === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [role.id], affectedRows: [role] };
		},
		createRole: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createRolesTable(dbConnection);

			const createdUser = await dbConnection<RoleEntity>("Roles")
				.insert(args)
				.returning("id");

			await dbConnection.destroy();

			if (createdUser.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdUser[0].id], affectedRows: [] };
		},
		updateRoleById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const dbConnection = createConnection();
			await createRolesTable(dbConnection);

			const foundRole = await dbConnection<RoleEntity>("Roles")
				.where("id", query.id)
				.first();

			if (foundRole === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedRole = await dbConnection<RoleEntity>("Roles")
				.where("id", query.id)
				.update({
					designation: args.designation || foundRole.designation,
				})
				.returning("*");

			await dbConnection.destroy();

			if (updatedRole.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return {
				affectedIds: [updatedRole[0].id],
				affectedRows: [{ updatedAt: updatedRole[0].updatedAt }],
			};
		},
	};
};

export { RoleRemoteRepository };
