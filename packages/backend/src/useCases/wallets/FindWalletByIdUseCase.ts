import type { Request, Response } from "express";
import { walletDTOMapper, findWalletByIdSchema } from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";

const FindWalletByIdUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		findWalletById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findWalletByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findWalletById({
				query: { id: schemaArgs.params.id },
			});

			if (affectedRows.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(200)
				.json({ data: walletDTOMapper(affectedRows[0]) });
		},
	};
};

export { FindWalletByIdUseCase };
