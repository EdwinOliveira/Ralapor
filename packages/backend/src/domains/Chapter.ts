import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type ChapterEntity = {
	id: number;
	bookId: number;
	categoryId: number;
	designation: string;
	description: string;
	price: number;
	isVisible: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type ChapterDTO = Readonly<ChapterEntity>;

const chapterDTOMapper = (entity: ChapterEntity): ChapterDTO => {
	return {
		id: entity.id,
		bookId: entity.bookId,
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

const findChapterByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindChapterByIdRequest = z.infer<typeof findChapterByIdSchema>;

const findChaptersByBookIdSchema = z.object({
	params: z.object({
		bookId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindChaptersByBookIdRequest = z.infer<typeof findChaptersByBookIdSchema>;

const findChaptersByCategoryIdSchema = z.object({
	params: z.object({
		categoryId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindChaptersByCategoryIdRequest = z.infer<
	typeof findChaptersByCategoryIdSchema
>;

const createChapterSchema = z.object({
	body: z.object({
		bookId: z
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

type CreateChapterRequest = z.infer<typeof createChapterSchema>;

const updateChapterByIdSchema = z.object({
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

type UpdateChapterByIdRequest = z.infer<typeof updateChapterByIdSchema>;

interface ChapterRepository {
	findChapterById({
		query,
	}: RepositoryRequest<Pick<ChapterEntity, "id">>): Promise<
		RepositoryResponse<ChapterEntity>
	>;
	findChaptersByBookId({
		query,
	}: RepositoryRequest<Pick<ChapterEntity, "bookId">>): Promise<
		RepositoryResponse<ChapterEntity>
	>;
	findChaptersByCategoryId({
		query,
	}: RepositoryRequest<Pick<ChapterEntity, "categoryId">>): Promise<
		RepositoryResponse<ChapterEntity>
	>;
	createChapter({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<
			ChapterEntity,
			"id" | "isVisible" | "isActive" | "createdAt" | "updatedAt"
		>
	>): Promise<RepositoryResponse<unknown>>;
	updateChapterById({
		args,
	}: RepositoryRequest<
		Pick<ChapterEntity, "id">,
		Partial<Omit<ChapterEntity, "id" | "bookId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<Pick<ChapterEntity, "updatedAt">>>;
}

export {
	type ChapterEntity,
	type ChapterDTO,
	chapterDTOMapper,
	findChapterByIdSchema,
	type FindChapterByIdRequest,
	findChaptersByBookIdSchema,
	type FindChaptersByBookIdRequest,
	findChaptersByCategoryIdSchema,
	type FindChaptersByCategoryIdRequest,
	createChapterSchema,
	type CreateChapterRequest,
	updateChapterByIdSchema,
	type UpdateChapterByIdRequest,
	type ChapterRepository,
};
