import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import {
  type FindRoleByDesignationRequest,
  type RoleDTO,
  roleDTOMapper,
} from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";

const FindRoleByDesignationUseCase = () => {
  const repository = RoleRemoteRepository();

  return {
    findRoleByDesignation: async ({
      schemaArgs: {
        params: { designation },
      },
    }: UseCaseRequest<FindRoleByDesignationRequest>): Promise<
      UseCaseResponse<RoleDTO>
    > => {
      const { affectedRows: foundRolesRow } =
        await repository.findRoleByDesignation({
          query: { designation },
        });

      if (foundRolesRow.length === 0) {
        return { statusCode: 404 };
      }

      return {
        statusCode: 200,
        args: roleDTOMapper(foundRolesRow[0]),
      };
    },
  };
};

export { FindRoleByDesignationUseCase };
