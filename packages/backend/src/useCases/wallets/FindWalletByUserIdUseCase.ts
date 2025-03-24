import {
	type WalletDTO,
	walletDTOMapper,
	type FindWalletByUserIdRequest,
} from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindWalletByUserIdUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		findWalletByUserId: async ({
			schemaArgs: {
				params: { userId },
			},
		}: UseCaseRequest<FindWalletByUserIdRequest>): Promise<
			UseCaseResponse<WalletDTO>
		> => {
			const { affectedRows: foundWalletsId } =
				await repository.findWalletByUserId({
					query: { userId },
				});

			if (foundWalletsId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: walletDTOMapper(foundWalletsId[0]),
			};
		},
	};
};

export { FindWalletByUserIdUseCase };
