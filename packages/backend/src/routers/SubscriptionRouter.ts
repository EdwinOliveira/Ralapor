import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindSubscriptionByIdUseCase } from "../useCases/subscriptions/FindSubscriptionByIdUseCase";
import { CreateSubscriptionUseCase } from "../useCases/subscriptions/CreateSubscriptionUseCase";
import { UpdateSubscriptionByIdUseCase } from "../useCases/subscriptions/UpdateSubscriptionByIdUseCase";
import { FindSubscriptionsByWalletIdUseCase } from "../useCases/subscriptions/FindSubscriptionsByWalletIdUseCase";
import { findSubscriptionByIdSchema } from "../domains/Subscription";

const SubscriptionRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findSubscriptionByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findSubscriptionById } = FindSubscriptionByIdUseCase();
				const { statusCode, args } = await findSubscriptionById({ schemaArgs });

				return void response.status(statusCode).json(args);
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
