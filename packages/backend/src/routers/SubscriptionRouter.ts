import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindSubscriptionByIdUseCase } from "../useCases/subscriptions/FindSubscriptionByIdUseCase";
import { CreateSubscriptionUseCase } from "../useCases/subscriptions/CreateSubscriptionUseCase";
import { UpdateSubscriptionByIdUseCase } from "../useCases/subscriptions/UpdateSubscriptionByIdUseCase";
import { FindSubscriptionsByWalletIdUseCase } from "../useCases/subscriptions/FindSubscriptionsByWalletIdUseCase";

const SubscriptionRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findSubscriptionById } = FindSubscriptionByIdUseCase();
				await findSubscriptionById(request, response);
			},
		);

		router.get(
			"/wallet/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findSubscriptionsByWalletId } =
					FindSubscriptionsByWalletIdUseCase();
				await findSubscriptionsByWalletId(request, response);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { createSubscription } = CreateSubscriptionUseCase();
				await createSubscription(request, response);
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { updateSubscriptionById } = UpdateSubscriptionByIdUseCase();
				await updateSubscriptionById(request, response);
			},
		);

		return router;
	};

	return { subscribe };
};

export { SubscriptionRouter };
