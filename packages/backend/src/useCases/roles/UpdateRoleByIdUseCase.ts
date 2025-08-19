import type { RoleDTO, UpdateRoleByIdRequest } from '../../domains/Role';
import type { UseCaseRequest, UseCaseResponse } from '../../signatures/UseCase';

import { RoleRemoteRepository } from '../../repositories/RoleRemoteRepository';

const UpdateRoleByIdUseCase = () => {
  const repository = RoleRemoteRepository();

  return {
    updateRoleById: async ({
      schemaArgs: {
        body: { designation },
        params: { id },
      },
    }: UseCaseRequest<UpdateRoleByIdRequest>): Promise<
      UseCaseResponse<Pick<RoleDTO, 'id' | 'updatedAt'>>
    > => {
      const { affectedIds: foundRolesId } = await repository.findRoleById({
        query: { id },
      });

      if (foundRolesId.length === 0) {
        return { statusCode: 404 };
      }

      const { affectedIds: updatedRolesId, affectedRows: updatedRolesRow } =
        await repository.updateRoleById({
          args: { designation },
          query: { id },
        });

      if (updatedRolesId.length === 0) {
        return { statusCode: 500 };
      }

      return {
        args: {
          id: updatedRolesId[0],
          updatedAt: updatedRolesRow[0].updatedAt,
        },
        statusCode: 201,
      };
    },
  };
};

export { UpdateRoleByIdUseCase };
