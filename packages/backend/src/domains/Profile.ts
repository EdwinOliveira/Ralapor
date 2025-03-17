import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type ProfileEntity = {
	id: number;
	userId: number;
	firstName: string;
	lastName: string;
	dateBirth: Date;
	createdAt: string;
	updatedAt: string;
};

type ProfileDTO = Readonly<ProfileEntity>;

const profileDTOMapper = (entity: ProfileEntity): ProfileDTO => {
	return {
		id: entity.id,
		userId: entity.userId,
		firstName: entity.firstName,
		lastName: entity.lastName,
		dateBirth: entity.dateBirth,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findProfileByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindProfileByIdRequest = z.infer<typeof findProfileByIdSchema>;

const findProfileByUserIdSchema = z.object({
	params: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindProfileByUserIdRequest = z.infer<typeof findProfileByUserIdSchema>;

const createProfileSchema = z.object({
	body: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		firstName: z.string(),
		lastName: z.string(),
		dateBirth: z.date(),
	}),
});

type CreateProfileRequest = z.infer<typeof createProfileSchema>;

const updateProfileByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		dateBirth: z.date().optional(),
	}),
});

type UpdateProfileByIdRequest = z.infer<typeof updateProfileByIdSchema>;

interface ProfileRepository {
	findProfileById({
		query,
	}: RepositoryRequest<Pick<ProfileEntity, "id">>): Promise<
		RepositoryResponse<ProfileEntity>
	>;
	findProfileByUserId({
		query,
	}: RepositoryRequest<Pick<ProfileEntity, "userId">>): Promise<
		RepositoryResponse<ProfileEntity>
	>;
	createProfile({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<ProfileEntity, "id" | "createdAt" | "updatedAt">
	>): Promise<RepositoryResponse<unknown>>;
	updateProfileById({
		args,
	}: RepositoryRequest<
		Pick<ProfileEntity, "id">,
		Partial<Omit<ProfileEntity, "id" | "userId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<unknown>>;
}

export {
	type ProfileEntity,
	type ProfileDTO,
	profileDTOMapper,
	findProfileByIdSchema,
	type FindProfileByIdRequest,
	findProfileByUserIdSchema,
	type FindProfileByUserIdRequest,
	createProfileSchema,
	type CreateProfileRequest,
	updateProfileByIdSchema,
	type UpdateProfileByIdRequest,
	type ProfileRepository,
};
