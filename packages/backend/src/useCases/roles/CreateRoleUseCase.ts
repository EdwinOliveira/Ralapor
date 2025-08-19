import type { CreateRoleRequest, RoleDTO } from '../../domains/Role';
import type { UseCaseRequest, UseCaseResponse } from '../../signatures/UseCase';

import { RoleRemoteRepository } from '../../repositories/RoleRemoteRepository';

const CreateRoleUseCase = () => {
  const repository = RoleRemoteRepository();

  return {
    createRole: async ({
      schemaArgs: {
        body: { designation },
      },
    }: UseCaseRequest<CreateRoleRequest>): Promise<
      UseCaseResponse<Pick<RoleDTO, 'id'>>
    > => {
      const { affectedIds: foundRolesId } =
        await repository.findRoleByDesignation({
          query: { designation },
        });

      if (foundRolesId.length !== 0) {
        return { statusCode: 409 };
      }

      const { affectedIds: createdRolesId } = await repository.createRole({
        args: { designation },
      });

      if (createdRolesId.length === 0) {
        return { statusCode: 500 };
      }

      return {
        args: { id: createdRolesId[0] },
        statusCode: 201,
      };
    },
  };
};

export { CreateRoleUseCase };
