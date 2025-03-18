import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type SubscriptionEntity = {
	id: number;
	userId: number;
	dossierId: number;
	bookId: number;
	chapterId: number;
	pageId: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type SubscriptionDTO = Readonly<SubscriptionEntity>;

const subscriptionDTOMapper = (entity: SubscriptionEntity): SubscriptionDTO => {
	return {
		id: entity.id,
		userId: entity.userId,
		dossierId: entity.dossierId,
		bookId: entity.bookId,
		chapterId: entity.chapterId,
		pageId: entity.pageId,
		isActive: entity.isActive,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findSubscriptionByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindSubscriptionByIdRequest = z.infer<typeof findSubscriptionByIdSchema>;

const findSubscriptionsByUserIdSchema = z.object({
	params: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindSubscriptionsByUserIdRequest = z.infer<
	typeof findSubscriptionsByUserIdSchema
>;

const createSubscriptionSchema = z.object({
	body: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		dossierId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		bookId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		chapterId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
		pageId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type CreateSubscriptionRequest = z.infer<typeof createSubscriptionSchema>;

const updateSubscriptionByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		isActive: z.boolean().optional(),
	}),
});

type UpdateSubscriptionByIdRequest = z.infer<
	typeof updateSubscriptionByIdSchema
>;

interface SubscriptionRepository {
	findSubscriptionById({
		query,
	}: RepositoryRequest<Pick<SubscriptionEntity, "id">>): Promise<
		RepositoryResponse<SubscriptionEntity>
	>;
	findSubscriptionsByUserId({
		query,
	}: RepositoryRequest<Pick<SubscriptionEntity, "userId">>): Promise<
		RepositoryResponse<SubscriptionEntity>
	>;
	createSubscription({
		args,
	}: RepositoryRequest<
		unknown,
		Omit<SubscriptionEntity, "id" | "isActive" | "createdAt" | "updatedAt">
	>): Promise<RepositoryResponse<unknown>>;
	updateSubscriptionById({
		args,
	}: RepositoryRequest<
		Pick<SubscriptionEntity, "id">,
		Partial<Pick<SubscriptionEntity, "isActive">>
	>): Promise<RepositoryResponse<unknown>>;
}

export {
	type SubscriptionEntity,
	type SubscriptionDTO,
	subscriptionDTOMapper,
	findSubscriptionByIdSchema,
	type FindSubscriptionByIdRequest,
	findSubscriptionsByUserIdSchema,
	type FindSubscriptionsByUserIdRequest,
	createSubscriptionSchema,
	type CreateSubscriptionRequest,
	updateSubscriptionByIdSchema,
	type UpdateSubscriptionByIdRequest,
	type SubscriptionRepository,
};
