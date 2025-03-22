import { z } from "zod";

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

export {
	type CategoryEntity,
	type CategoryDTO,
	categoryDTOMapper,
	findCategoryByIdSchema,
	type FindCategoryByIdRequest,
	createCategorySchema,
	type CreateCategoryRequest,
	updateCategoryByIdSchema,
	type UpdateCategoryByIdRequest,
};
