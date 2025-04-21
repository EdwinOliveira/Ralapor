import type { RoleEntity, RoleRepository } from "../domains/Role";
import type { HttpContext } from "../signatures/HttpContext";

const RoleRemoteRepository = ({
	services: {
		databaseService: { createConnection, destroyConnection },
	},
}: HttpContext): RoleRepository => {
	return {
		findRoles: async () => {
			const connection = createConnection();
			const roles = await connection<RoleEntity>("Roles");
			await destroyConnection(connection);

			return {
				affectedIds: roles.map((role) => role.id),
				affectedRows: roles,
			};
		},
		findRoleByDesignation: async ({ query }) => {
			if (query === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const role = await connection<RoleEntity>("Roles")
				.where("designation", query?.designation)
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

			const role = await connection<RoleEntity>("Roles")
				.where("id", query?.id)
				.first();

			await destroyConnection(connection);

			if (role === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [role.id], affectedRows: [role] };
		},
		createRole: async ({ args }) => {
			if (args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const createdUser = await connection<RoleEntity>("Roles")
				.insert(args)
				.returning("id");

			await destroyConnection(connection);

			if (createdUser.length === 0) {
				return { affectedIds: [], affectedRows: [] };
			}

			return { affectedIds: [createdUser[0].id], affectedRows: [] };
		},
		updateRoleById: async ({ query, args }) => {
			if (query === undefined || args === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const connection = createConnection();

			const foundRole = await connection<RoleEntity>("Roles")
				.where("id", query.id)
				.first();

			if (foundRole === undefined) {
				return { affectedIds: [], affectedRows: [] };
			}

			const updatedRoles = await connection<RoleEntity>("Roles")
				.where("id", query.id)
				.update({
					designation: args.designation || foundRole.designation,
				})
				.returning("*");

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
