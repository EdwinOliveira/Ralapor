import type { Request, Response } from "express";
import { createWalletSchema } from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";

const CreateWalletUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		createWallet: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createWalletSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundWalletsId } =
				await repository.findWalletByUserId({
					query: { userId: schemaArgs.body.userId },
				});

			if (foundWalletsId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: createdWalletsId } = await repository.createWallet({
				args: schemaArgs.body,
			});

			if (createdWalletsId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/subscriptions/${createdWalletsId[0]}`)
				.json();
		},
	};
};

export { CreateWalletUseCase };
