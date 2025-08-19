import type { CreateUserRequest, UserDTO } from '../../domains/User';
import type { UseCaseRequest, UseCaseResponse } from '../../signatures/UseCase';

import { HashProvider } from '../../providers/HashProvider';
import { RandomProvider } from '../../providers/RandomProvider';
import { UserRemoteRepository } from '../../repositories/UserRemoteRepository';
import { FindRoleByDesignationUseCase } from '../roles/FindRoleByDesignationUseCase';

const CreateUserUseCase = () => {
  const repository = UserRemoteRepository();
  const randomProvider = RandomProvider();
  const hashProvider = HashProvider();
  const { findRoleByDesignation } = FindRoleByDesignationUseCase();

  return {
    createUser: async ({
      schemaArgs: {
        body: { email, phoneNumber, phoneNumberCode, username },
      },
    }: UseCaseRequest<CreateUserRequest>): Promise<
      UseCaseResponse<Pick<UserDTO, 'id'>>
    > => {
      const { affectedIds: foundUsersId } =
        await repository.findUserByUsernameOrEmailOrPhoneNumber({
          query: { email, phoneNumber, username },
        });

      if (foundUsersId.length !== 0) {
        return { statusCode: 409 };
      }

      const {
        args: findRoleByDesignationArgs,
        statusCode: findRoleByDesignationStatusCode,
      } = await findRoleByDesignation({
        schemaArgs: { params: { designation: 'consumer' } },
      });

      if (
        findRoleByDesignationStatusCode !== 200 ||
        findRoleByDesignationArgs === undefined
      ) {
        return { statusCode: 500 };
      }

      const accessCode = randomProvider.createAccessCode(12);
      const hashedAccessCode = await hashProvider.hash(accessCode);

      const { affectedIds: createdUsersId } = await repository.createUser({
        args: {
          accessCode: hashedAccessCode,
          email,
          phoneNumber,
          phoneNumberCode,
          roleId: findRoleByDesignationArgs.id,
          username,
        },
      });

      if (createdUsersId.length === 0) {
        return { statusCode: 500 };
      }

      console.log(accessCode);

      return {
        args: { id: createdUsersId[0] },
        statusCode: 201,
      };
    },
  };
};

export { CreateUserUseCase };
