import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type BookEntity = {
	id: number;
	dossierId: number;
	categoryId: number;
	designation: string;
	description: string;
	price: number;
	isVisible: boolean;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type BookDTO = Readonly<BookEntity>;

const bookDTOMapper = (entity: BookEntity): BookDTO => {
	return {
		id: entity.id,
		dossierId: entity.dossierId,
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

const findBooksSchema = z.object({
	query: z.object({
		minLimit: z.number().optional(),
		maxLimit: z.number().optional(),
	}),
});
type FindBooksRequest = z.infer<typeof findBooksSchema>;

const findBookByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindBookByIdRequest = z.infer<typeof findBookByIdSchema>;

const findBooksByDossierIdSchema = z.object({
	params: z.object({
		dossierId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindBooksByDossierIdRequest = z.infer<typeof findBooksByDossierIdSchema>;

const findBooksByCategoryIdSchema = z.object({
	params: z.object({
		categoryId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindBooksByCategoryIdRequest = z.infer<typeof findBooksByCategoryIdSchema>;

const createBookSchema = z.object({
	body: z.object({
		dossierId: z
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

type CreateBookRequest = z.infer<typeof createBookSchema>;

const updateBookByIdSchema = z.object({
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

type UpdateBookByIdRequest = z.infer<typeof updateBookByIdSchema>;

interface BookRepository {
	findBooks(): Promise<RepositoryResponse<BookEntity>>;
	findBookById({
		query,
	}: RepositoryRequest<Pick<BookEntity, "id">>): Promise<
		RepositoryResponse<BookEntity>
	>;
	findBooksByDossierId({
		query,
	}: RepositoryRequest<Pick<BookEntity, "dossierId">>): Promise<
		RepositoryResponse<BookEntity>
	>;
	findBooksByCategoryId({
		query,
	}: RepositoryRequest<Pick<BookEntity, "categoryId">>): Promise<
		RepositoryResponse<BookEntity>
	>;
	createBook({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<
			BookEntity,
			"id" | "isVisible" | "isActive" | "createdAt" | "updatedAt"
		>
	>): Promise<RepositoryResponse<unknown>>;
	updateBookById({
		args,
	}: RepositoryRequest<
		Pick<BookEntity, "id">,
		Partial<Omit<BookEntity, "id" | "dossierId" | "createdAt" | "updatedAt">>
	>): Promise<RepositoryResponse<Pick<BookDTO, "updatedAt">>>;
}

export {
	type BookEntity,
	type BookDTO,
	bookDTOMapper,
	findBooksSchema,
	type FindBooksRequest,
	findBookByIdSchema,
	type FindBookByIdRequest,
	findBooksByDossierIdSchema,
	type FindBooksByDossierIdRequest,
	findBooksByCategoryIdSchema,
	type FindBooksByCategoryIdRequest,
	createBookSchema,
	type CreateBookRequest,
	updateBookByIdSchema,
	type UpdateBookByIdRequest,
	type BookRepository,
};
