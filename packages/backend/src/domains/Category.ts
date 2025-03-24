import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type CategoryEntity = {
	id: number;
	designation: string;
	createdAt: string;
	updatedAt: string;
};
type CategoryDTO = Readonly<CategoryEntity>;

const categoryDTOMapper = (entity: CategoryEntity): CategoryDTO => {
	return {
		id: entity.id,
		designation: entity.designation,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findCategoriesSchema = z.object({});
type FindCategoriesRequest = z.infer<typeof findCategoriesSchema>;

const findCategoryByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});
type FindCategoryByIdRequest = z.infer<typeof findCategoryByIdSchema>;

const createCategorySchema = z.object({
	body: z.object({
		designation: z.string(),
	}),
});
type CreateCategoryRequest = z.infer<typeof createCategorySchema>;

const updateCategoryByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		designation: z.string().optional(),
	}),
});
type UpdateCategoryByIdRequest = z.infer<typeof updateCategoryByIdSchema>;

interface CategoryRepository {
	findCategories(): Promise<RepositoryResponse<CategoryEntity>>;
	findCategoryById({
		query,
	}: RepositoryRequest<Pick<CategoryEntity, "id">>): Promise<
		RepositoryResponse<CategoryEntity>
	>;
	findCategoryByDesignation({
		query,
	}: RepositoryRequest<Pick<CategoryEntity, "designation">>): Promise<
		RepositoryResponse<CategoryEntity>
	>;
	createCategory({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<
			CategoryEntity,
			"id" | "isVisible" | "isActive" | "createdAt" | "updatedAt"
		>
	>): Promise<RepositoryResponse<unknown>>;
	updateCategoryById({
		args,
	}: RepositoryRequest<
		Pick<CategoryEntity, "id">,
		Partial<
			Omit<CategoryEntity, "id" | "dossierId" | "createdAt" | "updatedAt">
		>
	>): Promise<RepositoryResponse<Pick<CategoryDTO, "updatedAt">>>;
}

export {
	type CategoryEntity,
	type CategoryDTO,
	categoryDTOMapper,
	findCategoriesSchema,
	type FindCategoriesRequest,
	findCategoryByIdSchema,
	type FindCategoryByIdRequest,
	createCategorySchema,
	type CreateCategoryRequest,
	updateCategoryByIdSchema,
	type UpdateCategoryByIdRequest,
	type CategoryRepository,
};
