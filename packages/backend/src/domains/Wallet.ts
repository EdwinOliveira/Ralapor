import { z } from "zod";
import type {
	RepositoryRequest,
	RepositoryResponse,
} from "../types/Repository";

type WalletEntity = {
	id: number;
	userId: number;
	funds: number;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

type WalletDTO = Readonly<WalletEntity>;

const walletDTOMapper = (entity: WalletEntity): WalletDTO => {
	return {
		id: entity.id,
		userId: entity.userId,
		funds: entity.funds,
		isActive: entity.isActive,
		createdAt: entity.createdAt,
		updatedAt: entity.updatedAt,
	};
};

const findWalletByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindWalletByIdRequest = z.infer<typeof findWalletByIdSchema>;

const findWalletByUserIdSchema = z.object({
	params: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type FindWalletByUserIdRequest = z.infer<typeof findWalletByUserIdSchema>;

const createWalletSchema = z.object({
	body: z.object({
		userId: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
});

type CreateWalletRequest = z.infer<typeof createWalletSchema>;

const updateWalletByIdSchema = z.object({
	params: z.object({
		id: z
			.string()
			.transform((id) => Number.parseInt(id))
			.refine((id) => !Number.isNaN(id)),
	}),
	body: z.object({
		funds: z.number().optional(),
		isActive: z.boolean().optional(),
	}),
});

type UpdateWalletByIdRequest = z.infer<typeof updateWalletByIdSchema>;

interface WalletRepository {
	findWalletById({
		query,
	}: RepositoryRequest<Pick<WalletEntity, "id">>): Promise<
		RepositoryResponse<WalletEntity>
	>;
	findWalletByUserId({
		query,
	}: RepositoryRequest<Pick<WalletEntity, "userId">>): Promise<
		RepositoryResponse<WalletEntity>
	>;
	createWallet({
		args,
	}: RepositoryRequest<unknown, Pick<WalletEntity, "userId">>): Promise<
		RepositoryResponse<unknown>
	>;
	updateWalletById({
		args,
	}: RepositoryRequest<
		Pick<WalletEntity, "id">,
		Partial<Pick<WalletEntity, "funds" | "isActive">>
	>): Promise<RepositoryResponse<Pick<WalletEntity, "updatedAt">>>;
}

export {
	type WalletEntity,
	type WalletDTO,
	walletDTOMapper,
	findWalletByIdSchema,
	findWalletByUserIdSchema,
	createWalletSchema,
	updateWalletByIdSchema,
	type FindWalletByIdRequest,
	type FindWalletByUserIdRequest,
	type CreateWalletRequest,
	type UpdateWalletByIdRequest,
	type WalletRepository,
};
