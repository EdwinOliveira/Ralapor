import type { Request, Response, Router } from "express";
import { SessionGuard } from "../guards/SessionGuard";
import {
	createSessionSchema,
	destroySessionByIdSchema,
	findSessionByIdSchema,
	updateSessionByIdSchema,
} from "../domains/Session";
import { FindSessionByIdUseCase } from "../useCases/sessions/FindSessionByIdUseCase";
import { CreateSessionUseCase } from "../useCases/sessions/CreateSessionUseCase";
import { UpdateSessionByIdUseCase } from "../useCases/sessions/UpdateSessionByIdUseCase";
import { DestroySessionByIdUseCase } from "../useCases/sessions/DestroySessionByIdUseCase";
import { SessionProvider } from "../providers/SessionProvider";
import type { Context } from "../signatures/Context";

const SessionRouter = () => {
	const { isAuthenticated } = SessionGuard();

	const subscribe = (router: Router, context: Context): Router => {
		router.get(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findSessionByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findSessionById } = FindSessionByIdUseCase(context);
				const { statusCode, args } = await findSessionById({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post(
			"/",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					createSessionSchema.safeParse({ body: request.body });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				context.providers.sessionProvider = SessionProvider(request, response);

				const { createSession } = CreateSessionUseCase(context);
				const { statusCode, args } = await createSession({
					schemaArgs,
				});

				return void response.status(statusCode).json({ id: args?.id });
			},
		);

		router.put(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateSessionByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				context.providers.sessionProvider = SessionProvider(request, response);

				const { updateSessionById } = UpdateSessionByIdUseCase(context);
				const { statusCode, args } = await updateSessionById({
					schemaArgs,
				});

				return void response.status(statusCode).json({
					id: args?.id,
					updatedAt: args?.updatedAt,
				});
			},
		);

		router.delete(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					destroySessionByIdSchema.safeParse({
						params: request.params,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				context.providers.sessionProvider = SessionProvider(request, response);

				const { destroySessionById } = DestroySessionByIdUseCase(context);
				const { statusCode, args } = await destroySessionById({
					schemaArgs,
				});

				return void response.status(statusCode).json({
					id: args?.id,
					updatedAt: args?.updatedAt,
				});
			},
		);

		return router;
	};

	return { subscribe };
};

export { SessionRouter };
