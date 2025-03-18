import type { Request, Response } from "express";
import { updateWalletByIdSchema } from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";

const UpdateWalletByIdUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		updateWalletById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateWalletByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundWalletsId } = await repository.findWalletById({
				query: { id: schemaArgs.params.id },
			});

			if (foundWalletsId.length === 0) {
				return response.status(404).json();
			}

			const { affectedIds: updateWalletsById } =
				await repository.updateWalletById({
					query: { id: schemaArgs.params.id },
					args: schemaArgs.body,
				});

			if (updateWalletsById.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/wallets/${updateWalletsById[0]}`)
				.json();
		},
	};
};

export { UpdateWalletByIdUseCase };
