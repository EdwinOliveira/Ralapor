import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../signatures/Repository";

type SubstanceEntity = {
	id: number;
	designation: string;
	description: string;
	classification: string;
	createdAt: string;
	updatedAt: string;
};

type SubstanceDTO = Readonly<SubstanceEntity>;

const substanceDTOMapper = (entity: SubstanceEntity): SubstanceDTO => {
	return {
		id: entity.id,
		designation: entity.designation,
		description: entity.description,
		classification: entity.classification,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findSubstancesByQuerySchema = z.object({
	query: z.object({
		classification: z.enum(["fruits", "vegetables", "meat", "fish"]).optional(),
	}),
});

type FindSubstancesByQueryRequest = z.infer<typeof findSubstancesByQuerySchema>;

const findSubstanceByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindSubstanceByIdRequest = z.infer<typeof findSubstanceByIdSchema>;

const createSubstanceSchema = z.object({
	body: z.object({
		designation: z.string(),
		description: z.string(),
		classification: z.enum(["fruits", "vegetables", "meat", "fish"]),
	}),
});

type CreateSubstanceRequest = z.infer<typeof createSubstanceSchema>;

const updateSubstanceByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		designation: z.string().optional(),
		description: z.string().optional(),
		classification: z.enum(["fruits", "vegetables", "meat", "fish"]).optional(),
	}),
});

type UpdateSubstanceByIdRequest = z.infer<typeof updateSubstanceByIdSchema>;

interface SubstanceRepository {
	findSubstances({
		query,
	}: RepositoryRequest<
		Partial<Pick<SubstanceEntity, "classification">>
	>): Promise<RepositoryResponse<SubstanceEntity>>;
	findSubstanceById({
		query,
	}: RepositoryRequest<Pick<SubstanceEntity, "id">>): Promise<
		RepositoryResponse<SubstanceEntity>
	>;
	createSubstance({
		args,
	}: RepositoryRequest<
		unknown,
		Pick<SubstanceEntity, "designation" | "description" | "classification">
	>): Promise<RepositoryResponse<unknown>>;
	updateSubstanceById({
		query,
		args,
	}: RepositoryRequest<
		Pick<SubstanceEntity, "id">,
		Partial<Omit<SubstanceEntity, "id" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<Pick<SubstanceEntity, "updatedAt">>>;
}

export {
	type SubstanceEntity,
	type SubstanceDTO,
	substanceDTOMapper,
	findSubstancesByQuerySchema,
	type FindSubstancesByQueryRequest,
	findSubstanceByIdSchema,
	type FindSubstanceByIdRequest,
	createSubstanceSchema,
	type CreateSubstanceRequest,
	updateSubstanceByIdSchema,
	type UpdateSubstanceByIdRequest,
	type SubstanceRepository,
};
