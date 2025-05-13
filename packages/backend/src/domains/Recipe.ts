import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../signatures/Repository";

type RecipeEntity = {
	id: number;
	designation: string;
	description: string;
	dietaryPattern: string;
	createdAt: string;
	updatedAt: string;
};

type RecipeDTO = Readonly<RecipeEntity>;

const recipeDTOMapper = (entity: RecipeEntity): RecipeDTO => {
	return {
		id: entity.id,
		designation: entity.designation,
		description: entity.description,
		dietaryPattern: entity.dietaryPattern,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findRecipesByQuerySchema = z.object({
	query: z.object({
		dietaryPattern: z.enum(["plant-based", "animal-based"]).optional(),
	}),
});

type FindRecipesByQueryRequest = z.infer<typeof findRecipesByQuerySchema>;

const findRecipeByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindRecipeByIdRequest = z.infer<typeof findRecipeByIdSchema>;

const createRecipeSchema = z.object({
	body: z.object({
		designation: z.string(),
		description: z.string(),
		dietaryPattern: z.enum(["plant-based", "animal-based"]),
	}),
});

type CreateRecipeRequest = z.infer<typeof createRecipeSchema>;

const updateRecipeByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		designation: z.string().optional(),
		description: z.string().optional(),
		dietaryPattern: z.enum(["plant-based", "animal-based"]).optional(),
	}),
});

type UpdateRecipeByIdRequest = z.infer<typeof updateRecipeByIdSchema>;

interface RecipeRepository {
	findRecipes({
		query,
	}: RepositoryRequest<Partial<Pick<RecipeEntity, "dietaryPattern">>>): Promise<
		RepositoryResponse<RecipeEntity>
	>;
	findRecipeByDesignation({
		query,
	}: RepositoryRequest<Pick<RecipeEntity, "designation">>): Promise<
		RepositoryResponse<RecipeEntity>
	>;
	findRecipeById({
		query,
	}: RepositoryRequest<Pick<RecipeEntity, "id">>): Promise<
		RepositoryResponse<RecipeEntity>
	>;
	createRecipe({
		args,
	}: RepositoryRequest<
		unknown,
		Pick<RecipeEntity, "designation" | "description" | "dietaryPattern">
	>): Promise<RepositoryResponse<unknown>>;
	updateRecipeById({
		query,
		args,
	}: RepositoryRequest<
		Pick<RecipeEntity, "id">,
		Partial<Omit<RecipeEntity, "id" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<Pick<RecipeEntity, "updatedAt">>>;
}

export {
	type RecipeEntity,
	type RecipeDTO,
	recipeDTOMapper,
	findRecipesByQuerySchema,
	type FindRecipesByQueryRequest,
	type FindRecipeByIdRequest,
	createRecipeSchema,
	type CreateRecipeRequest,
	updateRecipeByIdSchema,
	type UpdateRecipeByIdRequest,
	type RecipeRepository,
};
