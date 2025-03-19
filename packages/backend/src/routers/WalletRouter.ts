import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindWalletByIdUseCase } from "../useCases/wallets/FindWalletByIdUseCase";
import { CreateWalletUseCase } from "../useCases/wallets/CreateWalletUseCase";
import { UpdateWalletByIdUseCase } from "../useCases/wallets/UpdateWalletByIdUseCase";
import { FindWalletByUserIdUseCase } from "../useCases/wallets/FindWalletByUserIdUseCase";

const WalletRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findWalletById } = FindWalletByIdUseCase();
				await findWalletById(request, response);
			},
		);

		router.get(
			"/user/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findWalletByUserId } = FindWalletByUserIdUseCase();
				await findWalletByUserId(request, response);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { createWallet } = CreateWalletUseCase();
				await createWallet(request, response);
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { updateWalletById } = UpdateWalletByIdUseCase();
				await updateWalletById(request, response);
			},
		);

		return router;
	};

	return { subscribe };
};

export { WalletRouter };
