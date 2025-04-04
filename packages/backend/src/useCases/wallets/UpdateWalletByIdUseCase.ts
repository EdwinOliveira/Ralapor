import type { UpdateWalletByIdRequest, WalletDTO } from "../../domains/Wallet";
import { WalletRemoteRepository } from "../../repositories/WalletRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateWalletByIdUseCase = () => {
	const repository = WalletRemoteRepository();

	return {
		updateWalletById: async ({
			schemaArgs: {
				params: { id },
				body: { funds, isActive },
			},
		}: UseCaseRequest<UpdateWalletByIdRequest>): Promise<
			UseCaseResponse<Pick<WalletDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundWalletsId } = await repository.findWalletById({
				query: { id },
			});

			if (foundWalletsId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedWalletsId, affectedRows: updatedWalletsRow } =
				await repository.updateWalletById({
					query: { id },
					args: { funds, isActive },
				});

			if (updatedWalletsId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedWalletsId[0],
					updatedAt: updatedWalletsRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateWalletByIdUseCase };
