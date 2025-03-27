import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type PageEntity = {
	id: number;
	chapterId: number;
	categoryId: number;
	designation: string;
	description: string;
	price: number;
	isVisible: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type PageDTO = Readonly<PageEntity>;

const pageDTOMapper = (entity: PageEntity): PageDTO => {
	return {
		id: entity.id,
		chapterId: entity.chapterId,
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

const findPagesSchema = z.object({
	query: z.object({
		minLimit: z.number().optional(),
		maxLimit: z.number().optional(),
	}),
});
type FindPagesRequest = z.infer<typeof findPagesSchema>;

const findPageByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindPageByIdRequest = z.infer<typeof findPageByIdSchema>;

const findPagesByChapterIdSchema = z.object({
	params: z.object({
		chapterId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindPagesByChapterIdRequest = z.infer<typeof findPagesByChapterIdSchema>;

const findPagesByCategoryIdSchema = z.object({
	params: z.object({
		categoryId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindPagesByCategoryIdRequest = z.infer<typeof findPagesByCategoryIdSchema>;

const createPageSchema = z.object({
	body: z.object({
		chapterId: z
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

type CreatePageRequest = z.infer<typeof createPageSchema>;

const updatePageByIdSchema = z.object({
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

type UpdatePageByIdRequest = z.infer<typeof updatePageByIdSchema>;

interface PageRepository {
	findPages(): Promise<RepositoryResponse<PageEntity>>;
	findPageById({
		query,
	}: RepositoryRequest<Pick<PageEntity, "id">>): Promise<
		RepositoryResponse<PageEntity>
	>;
	findPagesByChapterId({
		query,
	}: RepositoryRequest<Pick<PageEntity, "chapterId">>): Promise<
		RepositoryResponse<PageEntity>
	>;
	findPagesByCategoryId({
		query,
	}: RepositoryRequest<Pick<PageEntity, "categoryId">>): Promise<
		RepositoryResponse<PageEntity>
	>;
	createPage({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<
			PageEntity,
			"id" | "isVisible" | "isActive" | "createdAt" | "updatedAt"
		>
	>): Promise<RepositoryResponse<unknown>>;
	updatePageById({
		args,
	}: RepositoryRequest<
		Pick<PageEntity, "id">,
		Partial<Omit<PageEntity, "id" | "chapterId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<Pick<PageEntity, "updatedAt">>>;
}

export {
	type PageEntity,
	type PageDTO,
	pageDTOMapper,
	findPagesSchema,
	type FindPagesRequest,
	findPageByIdSchema,
	type FindPageByIdRequest,
	findPagesByChapterIdSchema,
	type FindPagesByChapterIdRequest,
	findPagesByCategoryIdSchema,
	type FindPagesByCategoryIdRequest,
	createPageSchema,
	type CreatePageRequest,
	updatePageByIdSchema,
	type UpdatePageByIdRequest,
	type PageRepository,
};
