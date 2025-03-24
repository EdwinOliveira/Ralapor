import type { CreateWalletRequest } from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const CreateWalletUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		createWallet: async ({
			schemaArgs: {
				body: { userId },
			},
		}: UseCaseRequest<CreateWalletRequest>): Promise<
			UseCaseResponse<unknown>
		> => {
			const { affectedIds: foundWalletsId } =
				await repository.findWalletByUserId({
					query: { userId },
				});

			if (foundWalletsId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: createdWalletsId } = await repository.createWallet({
				args: { userId },
			});

			if (createdWalletsId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				headers: { location: `/subscriptions/${createdWalletsId[0]}` },
			};
		},
	};
};

export { CreateWalletUseCase };
