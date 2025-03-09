import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type ChapterEntity = {
	id: number;
	bookId: number;
	designation: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

type ChapterDTO = Readonly<ChapterEntity>;

const chapterDTOMapper = (entity: ChapterEntity): ChapterDTO => {
	return {
		id: entity.id,
		bookId: entity.bookId,
		designation: entity.designation,
		description: entity.description,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findChapterByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
	}),
});

type FindChapterByIdRequest = z.infer<typeof findChapterByIdSchema>;

const findChapterByBookIdSchema = z.object({
	params: z.object({
		bookId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
	}),
});

type FindChapterByBookIdRequest = z.infer<typeof findChapterByBookIdSchema>;

const createChapterSchema = z.object({
	body: z.object({
		bookId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
		designation: z.string(),
		description: z.string(),
	}),
});

type CreateChapterRequest = z.infer<typeof createChapterSchema>;

const updateChapterByIdSchema = z.object({
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

type UpdateChapterByIdRequest = z.infer<typeof updateChapterByIdSchema>;

interface ChapterRepository {
	findChapterById({
		query,
	}: RepositoryRequest<Pick<ChapterEntity, "id">>): Promise<
		RepositoryResponse<ChapterEntity>
	>;
	findChapterByBookId({
		query,
	}: RepositoryRequest<Pick<ChapterEntity, "bookId">>): Promise<
		RepositoryResponse<ChapterEntity>
	>;
	createChapter({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<ChapterEntity, "id" | "createdAt" | "updatedAt">
	>): Promise<RepositoryResponse<unknown>>;
	updateChapterById({
		args,
	}: RepositoryRequest<
		Pick<ChapterEntity, "id">,
		Partial<Omit<ChapterEntity, "id" | "bookId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<unknown>>;
}

export {
	type ChapterEntity,
	type ChapterDTO,
	chapterDTOMapper,
	findChapterByIdSchema,
	type FindChapterByIdRequest,
	findChapterByBookIdSchema,
	type FindChapterByBookIdRequest,
	createChapterSchema,
	type CreateChapterRequest,
	updateChapterByIdSchema,
	type UpdateChapterByIdRequest,
	type ChapterRepository,
};
