import { createUserSessionSchema } from '../../../domains/user';
import { HashProvider } from '../../../providers/HashProvider';
import { UserRemoteRepository } from '../../../repositories/UserRemoteRepository';
import { UseCaseRequest, UseCaseResponse } from '../../../signatures/UseCase';

const CreateUserSessionUseCase = ({ request }: UseCaseRequest) => {
  const repository = UserRemoteRepository();
  const hashProvider = HashProvider();

  return {
    createUserSession: async (): Promise<UseCaseResponse<unknown>> => {
      try {
        const { data: schemaArgs, error: schemaErrors } =
          createUserSessionSchema.safeParse({ body: request.body });

        if (schemaErrors !== undefined) {
          return { errors: schemaErrors.issues, status: 400 };
        }

        const { affectedRows: foundUsers } =
          await repository.findUserByUsernameOrEmailOrPhoneNumber({
            queryArgs: {
              email: schemaArgs.body.email,
              phoneNumber: schemaArgs.body.phoneNumber,
              phoneNumberCode: schemaArgs.body.phoneNumberCode,
              username: schemaArgs.body.username,
            },
          });

        if (foundUsers.length === 0) {
          return { status: 404 };
        }

        const accessCodeEquals = await hashProvider.compare(
          schemaArgs.body.accessCode,
          foundUsers[0].accessCode
        );

        if (accessCodeEquals === false) {
          return { status: 401 };
        }

        return { data: { id: foundUsers[0].id }, status: 201 };
      } catch {
        return { status: 500 };
      }
    },
  };
};

export { CreateUserSessionUseCase };
