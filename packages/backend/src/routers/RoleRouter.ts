import type { Request, Response, Router } from "express";
import {
  createRoleSchema,
  findRoleByDesignationSchema,
  findRoleByIdSchema,
  updateRoleByIdSchema,
} from "../domains/Role";
import { ChallengeGuard } from "../guards/ChallengeGuard";
import { SessionGuard } from "../guards/SessionGuard";
import { CreateRoleUseCase } from "../useCases/roles/CreateRoleUseCase";
import { FindRoleByDesignationUseCase } from "../useCases/roles/FindRoleByDesignationUseCase";
import { FindRoleByIdUseCase } from "../useCases/roles/FindRoleByIdUseCase";
import { UpdateRoleByIdUseCase } from "../useCases/roles/UpdateRoleByIdUseCase";

const RoleRouter = () => {
  const { isAuthenticated } = SessionGuard();
  const { isChallengeCompleted } = ChallengeGuard();

  const subscribe = (router: Router): Router => {
    router.get(
      "/:id",
      isAuthenticated,
      isChallengeCompleted,
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          findRoleByIdSchema.safeParse({ params: request.params });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { findRoleById } = FindRoleByIdUseCase();
        const { statusCode, args } = await findRoleById({
          schemaArgs,
        });

        return void response.status(statusCode).json(args);
      }
    );

    router.get(
      "/designation/:designation",
      isAuthenticated,
      isChallengeCompleted,
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          findRoleByDesignationSchema.safeParse({ params: request.params });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { findRoleByDesignation } = FindRoleByDesignationUseCase();
        const { statusCode, args } = await findRoleByDesignation({
          schemaArgs,
        });

        return void response.status(statusCode).json(args);
      }
    );

    router.post(
      "/",
      isAuthenticated,
      isChallengeCompleted,
      async (request: Request, response: Response) => {
        const { data: schemaArgs, error: schemaErrors } =
          createRoleSchema.safeParse({ body: request.body });

        if (schemaErrors !== undefined) {
          return void response
            .status(400)
            .json({ errors: schemaErrors.issues });
        }

        const { createRole } = CreateRoleUseCase();
        const { statusCode, args } = await createRole({
          schemaArgs,
        });

        return void response.status(statusCode).json({ id: args?.id });
      }
    );

    router.put(
      "/:id",
      isAuthenticated,
      isChallengeCompleted,
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
      }
    );

    return router;
  };

  return { subscribe };
};

export { RoleRouter };
