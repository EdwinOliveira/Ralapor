import type { Request, Response, Router } from "express";
import { FindSubscriptionByIdUseCase } from "../useCases/subscriptions/FindSubscriptionByIdUseCase";
import { CreateSubscriptionUseCase } from "../useCases/subscriptions/CreateSubscriptionUseCase";
import { UpdateSubscriptionByIdUseCase } from "../useCases/subscriptions/UpdateSubscriptionByIdUseCase";
import { FindSubscriptionsByWalletIdUseCase } from "../useCases/subscriptions/FindSubscriptionsByWalletIdUseCase";
import {
	createSubscriptionSchema,
	findSubscriptionByIdSchema,
	findSubscriptionsByWalletIdSchema,
	updateSubscriptionByIdSchema,
} from "../domains/Subscription";

const SubscriptionRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findSubscriptionByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { findSubscriptionById } = FindSubscriptionByIdUseCase();
			const { statusCode, args } = await findSubscriptionById({ schemaArgs });

			return void response.status(statusCode).json(args);
		});

		router.get("/wallet/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findSubscriptionsByWalletIdSchema.safeParse({
					params: request.params,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { findSubscriptionsByWalletId } =
				FindSubscriptionsByWalletIdUseCase();
			const { statusCode, args } = await findSubscriptionsByWalletId({
				schemaArgs,
			});

			return void response.status(statusCode).json(args);
		});

		router.post("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createSubscriptionSchema.safeParse({
					params: request.params,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { createSubscription } = CreateSubscriptionUseCase();
			const { statusCode, args } = await createSubscription({
				schemaArgs,
			});

			return void response
				.status(statusCode)
				.location(`/subscriptions/${args?.id}`)
				.json();
		});

		router.put("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateSubscriptionByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { statusCode, args } =
				await UpdateSubscriptionByIdUseCase().updateSubscriptionById({
					schemaArgs,
				});

			return void response
				.status(statusCode)
				.location(`/subscriptions/${args?.id}`)
				.json({ updatedAt: args?.updatedAt });
		});

		return router;
	};

	return { subscribe };
};

export { SubscriptionRouter };
