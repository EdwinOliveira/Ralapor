import type {
  UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest,
  UserDTO,
} from '../../domains/User';
import type { UseCaseRequest, UseCaseResponse } from '../../signatures/UseCase';

import { HashProvider } from '../../providers/HashProvider';
import { RandomProvider } from '../../providers/RandomProvider';
import { UserRemoteRepository } from '../../repositories/UserRemoteRepository';

const UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase = () => {
  const repository = UserRemoteRepository();
  const randomProvider = RandomProvider();
  const hashProvider = HashProvider();

  return {
    updateUserAccessCodeByUsernameOrEmailOrPhoneNumber: async ({
      schemaArgs: {
        body: { email, phoneNumber, username },
      },
    }: UseCaseRequest<UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest>): Promise<
      UseCaseResponse<Pick<UserDTO, 'id' | 'updatedAt'>>
    > => {
      const { affectedIds: foundUsersId, affectedRows: foundUsersRow } =
        await repository.findUserByUsernameOrEmailOrPhoneNumber({
          query: { email, phoneNumber, username },
        });

      if (foundUsersId.length === 0) {
        return { statusCode: 404 };
      }

      const accessCode = randomProvider.createAccessCode(12);
      const hashedAccessCode = await hashProvider.hash(accessCode);

      const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
        await repository.updateUserById({
          args: { accessCode: hashedAccessCode },
          query: { id: foundUsersRow[0].id },
        });

      if (updatedUsersId.length === 0) {
        return { statusCode: 500 };
      }

      console.log(accessCode);

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

export { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase };
