import type { Request, Response, Router } from "express";
import { SessionGuard } from "../guards/SessionGuard";
import { FindRoleByIdUseCase } from "../useCases/roles/FindRoleByIdUseCase";
import {
	createRoleSchema,
	findRoleByIdSchema,
	updateRoleByIdSchema,
} from "../domains/Role";
import { CreateRoleUseCase } from "../useCases/roles/CreateRoleUseCase";
import { UpdateRoleByIdUseCase } from "../useCases/roles/UpdateRoleByIdUseCase";

const RoleRouter = () => {
	const { isAuthenticated } = SessionGuard();

	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findRoleByIdSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findRoleById } = FindRoleByIdUseCase();
				const { statusCode, args } = await findRoleById({ schemaArgs });

				return void response.status(statusCode).json(args);
			},
		);

		router.post(
			"/",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					createRoleSchema.safeParse({ body: request.body });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { createRole } = CreateRoleUseCase();
				const { statusCode, args } = await createRole({ schemaArgs });

				return void response.status(statusCode).json({ id: args?.id });
			},
		);

		router.put(
			"/:id",
			isAuthenticated,
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					updateRoleByIdSchema.safeParse({
						params: request.params,
						body: request.body,
					});

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { updateRoleById } = UpdateRoleByIdUseCase();
				const { statusCode, args } = await updateRoleById({
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

export { RoleRouter };
