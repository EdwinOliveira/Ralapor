import type { Request, Response, Router } from "express";
import { FindRoleByIdUseCase } from "../useCases/roles/FindRoleByIdUseCase";
import {
	createRoleSchema,
	findRoleByDesignationSchema,
	findRoleByIdSchema,
	updateRoleByIdSchema,
} from "../domains/Role";
import { CreateRoleUseCase } from "../useCases/roles/CreateRoleUseCase";
import { UpdateRoleByIdUseCase } from "../useCases/roles/UpdateRoleByIdUseCase";
import { FindRoleByDesignationUseCase } from "../useCases/roles/FindRoleByDesignationUseCase";
import type { Context } from "../signatures/Context";

const RoleRouter = () => {
	const subscribe = (router: Router, context: Context): Router => {
		router.get("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findRoleByIdSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { findRoleById } = FindRoleByIdUseCase(context);
			const { statusCode, args } = await findRoleById({
				schemaArgs,
			});

			return void response.status(statusCode).json(args);
		});

		router.get(
			"/designation/:designation",
			async (request: Request, response: Response) => {
				const { data: schemaArgs, error: schemaErrors } =
					findRoleByDesignationSchema.safeParse({ params: request.params });

				if (schemaErrors !== undefined) {
					return void response
						.status(400)
						.json({ errors: schemaErrors.issues });
				}

				const { findRoleByDesignation } = FindRoleByDesignationUseCase(context);
				const { statusCode, args } = await findRoleByDesignation({
					schemaArgs,
				});

				return void response.status(statusCode).json(args);
			},
		);

		router.post("/", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				createRoleSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { createRole } = CreateRoleUseCase(context);
			const { statusCode, args } = await createRole({
				schemaArgs,
			});

			return void response.status(statusCode).json({ id: args?.id });
		});

		router.put("/:id", async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateRoleByIdSchema.safeParse({
					params: request.params,
					body: request.body,
				});

			if (schemaErrors !== undefined) {
				return void response.status(400).json({ errors: schemaErrors.issues });
			}

			const { updateRoleById } = UpdateRoleByIdUseCase(context);
			const { statusCode, args } = await updateRoleById({
				schemaArgs,
			});

			return void response.status(statusCode).json({
				id: args?.id,
				updatedAt: args?.updatedAt,
			});
		});

		return router;
	};

	return { subscribe };
};

export { RoleRouter };
