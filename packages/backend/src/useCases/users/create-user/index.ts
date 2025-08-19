import { createUserSchema, UserEntity } from '../../../domains/user';
import { HashProvider } from '../../../providers/HashProvider';
import { RandomProvider } from '../../../providers/RandomProvider';
import { UserRemoteRepository } from '../../../repositories/UserRemoteRepository';
import { UseCaseRequest, UseCaseResponse } from '../../../signatures/UseCase';

const CreateUserUseCase = ({ request }: UseCaseRequest) => {
  const repository = UserRemoteRepository();
  const randomProvider = RandomProvider();
  const hashProvider = HashProvider();

  return {
    createUser: async (): Promise<UseCaseResponse<Pick<UserEntity, 'id'>>> => {
      try {
        const { data: schemaArgs, error: schemaErrors } =
          createUserSchema.safeParse({ body: request.body });

        if (schemaErrors !== undefined) {
          return { errors: schemaErrors.issues, status: 400 };
        }

        const { affectedIds: foundUsers } =
          await repository.findUserByUsernameOrEmailOrPhoneNumber({
            queryParams: {
              email: schemaArgs.body.email,
              phoneNumber: schemaArgs.body.phoneNumber,
              phoneNumberCode: schemaArgs.body.phoneNumberCode,
              username: schemaArgs.body.username,
            },
          });

        if (foundUsers.length > 0) {
          return { status: 409 };
        }

        const accessCode = randomProvider.createAccessCode(16);
        const hashedAccessCode = await hashProvider.hash(accessCode);

        const { affectedIds: createdUsers } = await repository.createUser({
          queryArgs: {
            accessCode: hashedAccessCode,
            email: schemaArgs.body.email,
            phoneNumber: schemaArgs.body.phoneNumber,
            phoneNumberCode: schemaArgs.body.phoneNumberCode,
            roleId: 1,
            username: schemaArgs.body.username,
          },
        });

        if (createdUsers.length === 0) {
          return { status: 500 };
        }

        return { data: { id: createdUsers[0] }, status: 201 };
      } catch {
        return { status: 500 };
      }
    },
  };
};

export { CreateUserUseCase };
