import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type DossierEntity = {
	id: number;
	userId: number;
	categoryId: number;
	designation: string;
	description: string;
	price: number;
	isVisible: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type DossierDTO = Readonly<DossierEntity>;

const dossierDTOMapper = (entity: DossierEntity): DossierDTO => {
	return {
		id: entity.id,
		userId: entity.userId,
		categoryId: entity.categoryId,
		designation: entity.designation,
		description: entity.description,
		price: entity.price,
		isVisible: entity.isVisible,
		isActive: entity.isActive,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findDossiersSchema = z.object({
	query: z.object({
		minLimit: z.number().optional(),
		maxLimit: z.number().optional(),
	}),
});
type FindDossiersRequest = z.infer<typeof findDossiersSchema>;

const findDossierByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindDossierByIdRequest = z.infer<typeof findDossierByIdSchema>;

const findDossiersByUserIdSchema = z.object({
	params: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindDossiersByUserIdRequest = z.infer<typeof findDossiersByUserIdSchema>;

const findDossiersByCategoryIdSchema = z.object({
	params: z.object({
		categoryId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindDossiersByCategoryIdRequest = z.infer<
	typeof findDossiersByCategoryIdSchema
>;

const createDossierSchema = z.object({
	body: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		categoryId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		designation: z.string(),
		description: z.string(),
		price: z.number(),
	}),
});

type CreateDossierRequest = z.infer<typeof createDossierSchema>;

const updateDossierByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		designation: z.string().optional(),
		description: z.string().optional(),
		price: z.number().optional(),
		isVisible: z.boolean().optional(),
		isActive: z.boolean().optional(),
	}),
});

type UpdateDossierByIdRequest = z.infer<typeof updateDossierByIdSchema>;

interface DossierRepository {
	findDossiers(): Promise<RepositoryResponse<DossierEntity>>;
	findDossierById({
		query,
	}: RepositoryRequest<Pick<DossierEntity, "id">>): Promise<
		RepositoryResponse<DossierEntity>
	>;
	findDossiersByUserId({
		query,
	}: RepositoryRequest<Pick<DossierEntity, "userId">>): Promise<
		RepositoryResponse<DossierEntity>
	>;
	findDossiersByCategoryId({
		query,
	}: RepositoryRequest<Pick<DossierEntity, "categoryId">>): Promise<
		RepositoryResponse<DossierEntity>
	>;
	createDossier({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<
			DossierEntity,
			"id" | "isVisible" | "isActive" | "createdAt" | "updatedAt"
		>
	>): Promise<RepositoryResponse<unknown>>;
	updateDossierById({
		args,
	}: RepositoryRequest<
		Pick<DossierEntity, "id">,
		Partial<Omit<DossierEntity, "id" | "userId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<Pick<DossierEntity, "updatedAt">>>;
}

export {
	type DossierEntity,
	type DossierDTO,
	dossierDTOMapper,
	findDossiersSchema,
	type FindDossiersRequest,
	findDossierByIdSchema,
	type FindDossierByIdRequest,
	findDossiersByUserIdSchema,
	type FindDossiersByUserIdRequest,
	findDossiersByCategoryIdSchema,
	type FindDossiersByCategoryIdRequest,
	createDossierSchema,
	type CreateDossierRequest,
	updateDossierByIdSchema,
	type UpdateDossierByIdRequest,
	type DossierRepository,
};
