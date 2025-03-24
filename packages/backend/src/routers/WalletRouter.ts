import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindWalletByIdUseCase } from "../useCases/wallets/FindWalletByIdUseCase";
import { CreateWalletUseCase } from "../useCases/wallets/CreateWalletUseCase";
import { UpdateWalletByIdUseCase } from "../useCases/wallets/UpdateWalletByIdUseCase";
import { FindWalletByUserIdUseCase } from "../useCases/wallets/FindWalletByUserIdUseCase";
import {
	createWalletSchema,
	findWalletByIdSchema,
	findWalletByUserIdSchema,
	updateWalletByIdSchema,
} from "../domains/Wallet";

const WalletRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findWalletByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findWalletById } = FindWalletByIdUseCase();
				const { statusCode, args } = await findWalletById({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.get(
			"/user/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findWalletByUserIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findWalletByUserId } = FindWalletByUserIdUseCase();
				const { statusCode, args } = await findWalletByUserId({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					createWalletSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { createWallet } = CreateWalletUseCase();
				const { statusCode, headers } = await createWallet({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(headers ? headers.location : "")
					.json();
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateWalletByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateWalletById } = UpdateWalletByIdUseCase();
				const { statusCode, headers, args } = await updateWalletById({
					schemaArgs,
				});

				return void response
					.status(statusCode)
					.location(headers ? headers.location : "")
					.json(args);
			},
		);

		return router;
	};

	return { subscribe };
};

export { WalletRouter };
