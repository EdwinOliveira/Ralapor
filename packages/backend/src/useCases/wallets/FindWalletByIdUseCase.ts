import {
	type FindWalletByIdRequest,
	type WalletDTO,
	walletDTOMapper,
} from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindWalletByIdUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		findWalletById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindWalletByIdRequest>): Promise<
			UseCaseResponse<WalletDTO>
		> => {
			const { affectedRows } = await repository.findWalletById({
				query: { id },
			});

			if (affectedRows.length === 0) {
				return { statusCode: 404 };
			}

			return { statusCode: 200, args: walletDTOMapper(affectedRows[0]) };
		},
	};
};

export { FindWalletByIdUseCase };
