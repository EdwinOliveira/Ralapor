import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../signatures/Repository";

type SessionEntity = {
	id: number;
	userId: number;
	roleId: number;
	expiresIn: string;
	isExpired: boolean;
	createdAt: string;
	updatedAt: string;
};

type SessionDTO = Readonly<SessionEntity>;

const sessionDTOMapper = (entity: SessionEntity): SessionDTO => {
	return {
		id: entity.id,
		userId: entity.userId,
		roleId: entity.roleId,
		expiresIn: entity.expiresIn,
		isExpired: entity.isExpired,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findSessionByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindSessionByIdRequest = z.infer<typeof findSessionByIdSchema>;

const findSessionByUserIdAndRoleIdSchema = z.object({
	params: z.object({
		userId: z
			.string()
			.transform((userId) => Number.parseInt(userId))
			.refine((userId) => !Number.isNaN(userId)),
		roleId: z
			.string()
			.transform((userId) => Number.parseInt(userId))
			.refine((userId) => !Number.isNaN(userId)),
	}),
});

type FindSessionByUserIdAndRoleIdRequest = z.infer<
	typeof findSessionByUserIdAndRoleIdSchema
>;

const createSessionSchema = z.object({
	body: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		roleId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		expiresIn: z.string(),
	}),
});

type CreateSessionRequest = z.infer<typeof createSessionSchema>;

const updateSessionByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		expiresIn: z.string(),
		isExpired: z.boolean(),
	}),
});

type UpdateSessionByIdRequest = z.infer<typeof updateSessionByIdSchema>;

interface SessionRepository {
	findSessionById({
		query,
	}: RepositoryRequest<Pick<SessionEntity, "id">>): Promise<
		RepositoryResponse<SessionEntity>
	>;
	findSessionByUserIdAndRoleId({
		query,
	}: RepositoryRequest<Pick<SessionEntity, "userId" | "roleId">>): Promise<
		RepositoryResponse<SessionEntity>
	>;
	createSession({
		args,
	}: RepositoryRequest<
		unknown,
		Pick<SessionEntity, "userId" | "roleId" | "expiresIn" | "isExpired">
	>): Promise<RepositoryResponse<unknown>>;
	updateSessionById({
		query,
		args,
	}: RepositoryRequest<
		Pick<SessionEntity, "id">,
		Partial<
			Omit<
				SessionEntity,
				"id" | "userId" | "roleId" | "createdAt" | "updatedAt"
			>
		>
	>): Promise<RepositoryResponse<Pick<SessionEntity, "updatedAt">>>;
}

export {
	type SessionEntity,
	type SessionDTO,
	sessionDTOMapper,
	findSessionByIdSchema,
	type FindSessionByIdRequest,
	findSessionByUserIdAndRoleIdSchema,
	type FindSessionByUserIdAndRoleIdRequest,
	createSessionSchema,
	type CreateSessionRequest,
	updateSessionByIdSchema,
	type UpdateSessionByIdRequest,
	type SessionRepository,
};
