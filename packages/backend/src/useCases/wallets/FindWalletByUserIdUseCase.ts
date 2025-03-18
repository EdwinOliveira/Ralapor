import type { Request, Response } from "express";
import {
	walletDTOMapper,
	findWalletByUserIdSchema,
} from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";

const FindWalletByUserIdUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		findWalletByUserId: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findWalletByUserIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findWalletByUserId({
				query: { userId: schemaArgs.params.userId },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response.status(200).json({
				data: affectedRows.map((affectedRow) => walletDTOMapper(affectedRow)),
			});
		},
	};
};

export { FindWalletByUserIdUseCase };
