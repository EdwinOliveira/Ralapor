import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type DossierEntity = {
	id: number;
	userId: number;
	designation: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

type DossierDTO = Readonly<DossierEntity>;

const dossierDTOMapper = (entity: DossierEntity): DossierDTO => {
	return {
		id: entity.id,
		userId: entity.userId,
		designation: entity.designation,
		description: entity.description,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findDossierByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
	}),
});

type FindDossierByIdRequest = z.infer<typeof findDossierByIdSchema>;

const findDossierByUserIdSchema = z.object({
	params: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
	}),
});

type FindDossierByUserIdRequest = z.infer<typeof findDossierByUserIdSchema>;

const createDossierSchema = z.object({
	body: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
		designation: z.string(),
		description: z.string(),
	}),
});

type CreateDossierRequest = z.infer<typeof createDossierSchema>;

const updateDossierByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
	}),
	body: z.object({
		designation: z.string().optional(),
		description: z.string().optional(),
	}),
});

type UpdateDossierByIdRequest = z.infer<typeof updateDossierByIdSchema>;

interface DossierRepository {
	findDossierById({
		query,
	}: RepositoryRequest<Pick<DossierEntity, "id">>): Promise<
		RepositoryResponse<DossierEntity>
	>;
	findDossierByUserId({
		query,
	}: RepositoryRequest<Pick<DossierEntity, "userId">>): Promise<
		RepositoryResponse<DossierEntity>
	>;
	createDossier({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<DossierEntity, "id" | "createdAt" | "updatedAt">
	>): Promise<RepositoryResponse<unknown>>;
	updateDossierById({
		args,
	}: RepositoryRequest<
		Pick<DossierEntity, "id">,
		Partial<Omit<DossierEntity, "id" | "userId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<unknown>>;
}

export {
	type DossierEntity,
	type DossierDTO,
	dossierDTOMapper,
	findDossierByIdSchema,
	type FindDossierByIdRequest,
	findDossierByUserIdSchema,
	type FindDossierByUserIdRequest,
	createDossierSchema,
	type CreateDossierRequest,
	updateDossierByIdSchema,
	type UpdateDossierByIdRequest,
	type DossierRepository,
};
