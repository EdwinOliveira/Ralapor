import type { UserDTO } from "../../domains/User";
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
			UseCaseResponse<Pick<UserDTO, "id">>
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
				args: { id: createdWalletsId[0] },
			};
		},
	};
};

export { CreateWalletUseCase };
