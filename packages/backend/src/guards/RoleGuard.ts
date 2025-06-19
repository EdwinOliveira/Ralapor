import type { NextFunction, Request, Response } from "express";
import { SessionProvider } from "../providers/SessionProvider";
import { RoleRemoteRepository } from "../repositories/RoleRemoteRepository";
import { CacheService } from "../services/CacheService";

const RoleGuard = () => {
  const repository = RoleRemoteRepository();

  const findRoleByDesignation = async (
    request: Request,
    response: Response,
    next: NextFunction,
    designation: "publisher" | "consumer" | "publisher-consumer"
  ) => {
    try {
      const session = SessionProvider(request, response).getSession();

      if (session === undefined || session.sid === undefined) {
        return void response.status(401).json();
      }

      const { findOnCache, isSessionCache } = CacheService();
      const cachedSession = await findOnCache(`session:${session.sid}`);

      if (!isSessionCache(cachedSession)) {
        return void response.status(401).json();
      }

      const { affectedRows: foundRolesRow } = await repository.findRoleById({
        query: { id: cachedSession.roleId },
      });

      if (
        foundRolesRow.length === 0 ||
        foundRolesRow[0].designation !== designation
      ) {
        return void response.status(403).json();
      }

      return next();
    } catch (error) {
      return void response.status(500).json();
    }
  };

  return {
    isPublisher: async (
      request: Request,
      response: Response,
      next: NextFunction
    ) => findRoleByDesignation(request, response, next, "publisher"),
    isConsumer: async (
      request: Request,
      response: Response,
      next: NextFunction
    ) => findRoleByDesignation(request, response, next, "consumer"),
    isPublisherConsumer: async (
      request: Request,
      response: Response,
      next: NextFunction
    ) => findRoleByDesignation(request, response, next, "publisher-consumer"),
  };
};

export { RoleGuard };
