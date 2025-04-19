import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../signatures/Repository";

type RoleEntity = {
	id: number;
	designation: string;
	createdAt: string;
	updatedAt: string;
};

type RoleDTO = Readonly<RoleEntity>;

const roleDTOMapper = (entity: RoleEntity): RoleDTO => {
	return {
		id: entity.id,
		designation: entity.designation,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findRoleByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindRoleByIdRequest = z.infer<typeof findRoleByIdSchema>;

const createRoleSchema = z.object({
	body: z.object({
		designation: z.enum(["publisher", "consumer", "publisher-consumer"]),
	}),
});

type CreateRoleRequest = z.infer<typeof createRoleSchema>;

const updateRoleByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		designation: z.enum(["publisher", "consumer", "publisher-consumer"]),
	}),
});

type UpdateRoleByIdRequest = z.infer<typeof updateRoleByIdSchema>;

interface RoleRepository {
	findRoles(): Promise<RepositoryResponse<RoleEntity>>;
	findRoleById({
		query,
	}: RepositoryRequest<Pick<RoleEntity, "id">>): Promise<
		RepositoryResponse<RoleEntity>
	>;
	findRoleByDesignation({
		query,
	}: RepositoryRequest<Pick<RoleEntity, "designation">>): Promise<
		RepositoryResponse<RoleEntity>
	>;
	createRole({
		args,
	}: RepositoryRequest<unknown, Pick<RoleEntity, "designation">>): Promise<
		RepositoryResponse<unknown>
	>;
	updateRoleById({
		query,
		args,
	}: RepositoryRequest<
		Pick<RoleEntity, "id">,
		Partial<Omit<RoleEntity, "id" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<Pick<RoleEntity, "updatedAt">>>;
}

export {
	type RoleEntity,
	type RoleDTO,
	roleDTOMapper,
	findRoleByIdSchema,
	type FindRoleByIdRequest,
	createRoleSchema,
	type CreateRoleRequest,
	updateRoleByIdSchema,
	type UpdateRoleByIdRequest,
	type RoleRepository,
};
