import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type PageEntity = {
	id: number;
	chapterId: number;
	designation: string;
	description: string;
	createdAt: string;
	updatedAt: string;
};

type PageDTO = Readonly<PageEntity>;

const pageDTOMapper = (entity: PageEntity): PageDTO => {
	return {
		id: entity.id,
		chapterId: entity.chapterId,
		designation: entity.designation,
		description: entity.description,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findPageByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
	}),
});

type FindPageByIdRequest = z.infer<typeof findPageByIdSchema>;

const findPageByChapterIdSchema = z.object({
	params: z.object({
		chapterId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
	}),
});

type FindPageByChapterIdRequest = z.infer<typeof findPageByChapterIdSchema>;

const createPageSchema = z.object({
	body: z.object({
		chapterId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => Number.isNaN(id)),
		designation: z.string(),
		description: z.string(),
	}),
});

type CreatePageRequest = z.infer<typeof createPageSchema>;

const updatePageByIdSchema = z.object({
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

type UpdatePageByIdRequest = z.infer<typeof updatePageByIdSchema>;

interface PageRepository {
	findPageById({
		query,
	}: RepositoryRequest<Pick<PageEntity, "id">>): Promise<
		RepositoryResponse<PageEntity>
	>;
	findPageByChapterId({
		query,
	}: RepositoryRequest<Pick<PageEntity, "chapterId">>): Promise<
		RepositoryResponse<PageEntity>
	>;
	createPage({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<PageEntity, "id" | "createdAt" | "updatedAt">
	>): Promise<RepositoryResponse<unknown>>;
	updatePageById({
		args,
	}: RepositoryRequest<
		Pick<PageEntity, "id">,
		Partial<Omit<PageEntity, "id" | "chapterId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<unknown>>;
}

export {
	type PageEntity,
	type PageDTO,
	pageDTOMapper,
	findPageByIdSchema,
	type FindPageByIdRequest,
	findPageByChapterIdSchema,
	type FindPageByChapterIdRequest,
	createPageSchema,
	type CreatePageRequest,
	updatePageByIdSchema,
	type UpdatePageByIdRequest,
	type PageRepository,
};
