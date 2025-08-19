import type { UpdateUserByIdRequest, UserDTO } from '../../domains/User';
import type { UseCaseRequest, UseCaseResponse } from '../../signatures/UseCase';

import { UserRemoteRepository } from '../../repositories/UserRemoteRepository';

const UpdateUserByIdUseCase = () => {
  const repository = UserRemoteRepository();

  return {
    updateUserById: async ({
      schemaArgs: {
        body: schemaArgsBody,
        params: { id },
      },
    }: UseCaseRequest<UpdateUserByIdRequest>): Promise<
      UseCaseResponse<Pick<UserDTO, 'id' | 'updatedAt'>>
    > => {
      const { affectedIds: foundUsersId } = await repository.findUserById({
        query: { id },
      });

      if (foundUsersId.length === 0) {
        return { statusCode: 404 };
      }

      const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
        await repository.updateUserById({
          args: schemaArgsBody,
          query: { id },
        });

      if (updatedUsersId.length === 0) {
        return { statusCode: 500 };
      }

      return {
        args: {
          id: updatedUsersId[0],
          updatedAt: updatedUsersRow[0].updatedAt,
        },
        statusCode: 201,
      };
    },
  };
};

export { UpdateUserByIdUseCase };
