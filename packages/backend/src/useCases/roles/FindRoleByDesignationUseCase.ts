import type { UseCaseRequest, UseCaseResponse } from '../../signatures/UseCase';

import {
  type FindRoleByDesignationRequest,
  type RoleDTO,
  roleDTOMapper,
} from '../../domains/Role';
import { RoleRemoteRepository } from '../../repositories/RoleRemoteRepository';

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
        args: roleDTOMapper(foundRolesRow[0]),
        statusCode: 200,
      };
    },
  };
};

export { FindRoleByDesignationUseCase };
