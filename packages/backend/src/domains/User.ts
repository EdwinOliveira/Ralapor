import z from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type UserEntity = {
	id: number;
	username: string;
	email: string;
	phoneNumber: string;
	phoneNumberCode: string;
	accessCode: string;
	accessToken: string;
	refreshToken: string;
	createdAt: string;
	updatedAt: string;
};

type UserDTO = Readonly<Omit<UserEntity, "accessCode">>;

const userDTOMapper = (entity: UserEntity): UserDTO => {
	return {
		id: entity.id,
		username: entity.username,
		email: entity.email,
		phoneNumber: entity.phoneNumber,
		phoneNumberCode: entity.phoneNumberCode,
		accessToken: entity.accessToken,
		refreshToken: entity.refreshToken,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findUserByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindUserByIdRequest = z.infer<typeof findUserByIdSchema>;

const findUserByAccessCodeSchema = z.object({
	params: z.object({
		accessCode: z.string(),
	}),
});

type FindUserByAccessCodeRequest = z.infer<typeof findUserByAccessCodeSchema>;

const createUserSchema = z.object({
	body: z.object({
		username: z.string(),
		email: z.string().email(),
		phoneNumber: z.string(),
		phoneNumberCode: z.enum(["+351", "+44"]),
	}),
});

type CreateUserRequest = z.infer<typeof createUserSchema>;

const updateUserByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		username: z.string().optional(),
		email: z.string().email().optional(),
		phoneNumber: z.string().optional(),
		phoneNumberCode: z.enum(["+351", "+44"]).optional(),
	}),
});

type UpdateUserByIdRequest = z.infer<typeof updateUserByIdSchema>;

const updateUserAccessCodeByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type UpdateUserAccessCodeByIdRequest = z.infer<
	typeof updateUserAccessCodeByIdSchema
>;

const updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema = z.object({
	params: z.object({
		username: z.string().optional(),
		email: z.string().email().optional(),
		phoneNumber: z.string().optional(),
	}),
});

type UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest = z.infer<
	typeof updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema
>;

const updateUserTokensByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type UpdateUserTokensByIdRequest = z.infer<typeof updateUserTokensByIdSchema>;

const destroyUserTokensByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type DestroyUserTokensByIdRequest = z.infer<typeof destroyUserTokensByIdSchema>;

interface UserRepository {
	findUsers(): Promise<RepositoryResponse<UserEntity>>;
	findUserById({
		query,
	}: RepositoryRequest<Pick<UserEntity, "id">>): Promise<
		RepositoryResponse<UserEntity>
	>;
	findUserByUsernameAndEmailAndPhoneNumber({
		query,
	}: RepositoryRequest<
		Pick<UserEntity, "username" | "email" | "phoneNumber">
	>): Promise<RepositoryResponse<UserEntity>>;
	findUserByUsernameOrEmailOrPhoneNumber({
		query,
	}: RepositoryRequest<
		Partial<Pick<UserEntity, "username" | "email" | "phoneNumber">>
	>): Promise<RepositoryResponse<UserEntity>>;
	createUser({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<
			UserEntity,
			"id" | "accessToken" | "refreshToken" | "createdAt" | "updatedAt"
		>
	>): Promise<RepositoryResponse<unknown>>;
	updateUserById({
		args,
	}: RepositoryRequest<
		Pick<UserEntity, "id">,
		Partial<Omit<UserEntity, "id" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<unknown>>;
}

export {
	type UserEntity,
	type UserDTO,
	userDTOMapper,
	type UserRepository,
	findUserByIdSchema,
	type FindUserByIdRequest,
	findUserByAccessCodeSchema,
	type FindUserByAccessCodeRequest,
	createUserSchema,
	type CreateUserRequest,
	updateUserByIdSchema,
	type UpdateUserByIdRequest,
	updateUserAccessCodeByIdSchema,
	type UpdateUserAccessCodeByIdRequest,
	updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema,
	type UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest,
	updateUserTokensByIdSchema,
	type UpdateUserTokensByIdRequest,
	destroyUserTokensByIdSchema,
	type DestroyUserTokensByIdRequest,
};
