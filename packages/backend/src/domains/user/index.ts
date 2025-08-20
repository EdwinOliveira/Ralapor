import z from 'zod';

import {
  RepositoryRequest,
  RepositoryResponse,
} from '../../signatures/Repository';

type UserEntity = {
  accessCode: string;
  createdAt: number;
  email: string;
  id: number;
  phoneNumber: string;
  phoneNumberCode: '+351' | '+44';
  roleId: number;
  updatedAt: number;
  username: string;
};

type UserDTO = Readonly<Omit<UserEntity, 'accessCode'>>;

const UserDTOMapper = () => {
  return {
    mapToDTO: (entity: UserEntity): UserDTO => ({
      createdAt: entity.createdAt,
      email: entity.email,
      id: entity.id,
      phoneNumber: entity.phoneNumber,
      phoneNumberCode: entity.phoneNumberCode,
      roleId: entity.roleId,
      updatedAt: entity.updatedAt,
      username: entity.username,
    }),
  };
};

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email().nonempty(),
    phoneNumber: z.string().nonempty(),
    phoneNumberCode: z.enum(['+351', '+44']),
    username: z.string().nonempty(),
  }),
});

type CreateUserRequest = z.infer<typeof createUserSchema>;

const createUserSessionSchema = z.object({
  body: z
    .object({
      accessCode: z.string().nonempty(),
      email: z.string().email().optional(),
      phoneNumber: z.string().optional(),
      phoneNumberCode: z.enum(['+351', '+44']).optional(),
      username: z.string().optional(),
    })
    .superRefine(({ email, phoneNumber, phoneNumberCode, username }, ctx) => {
      const ERROR_MESSAGES = {
        oneRequired: 'Missing Fields: Username, Email or PhoneNumber required',
        phoneNumberCodeRequired:
          'Missing Fields: PhoneNumber provided requires PhoneNumberCode.',
      };

      const addIssue = (message: string) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message,
        });
      };

      if (!email && !phoneNumber && !username) {
        addIssue(ERROR_MESSAGES.oneRequired);
      }

      if (phoneNumber && !phoneNumberCode) {
        addIssue(ERROR_MESSAGES.phoneNumberCodeRequired);
      }
    }),
});

type CreateUserSessionRequest = z.infer<typeof createUserSessionSchema>;

interface UserRepository {
  findUserById: ({
    queryParams,
  }: RepositoryRequest<Pick<UserEntity, 'id'>, unknown>) => Promise<
    RepositoryResponse<UserEntity>
  >;
  findUserByUsernameOrEmailOrPhoneNumber: ({
    queryParams,
  }: RepositoryRequest<
    Partial<
      Pick<UserEntity, 'email' | 'phoneNumber' | 'phoneNumberCode' | 'username'>
    >,
    unknown
  >) => Promise<RepositoryResponse<UserEntity>>;
  createUser: ({
    queryArgs,
  }: RepositoryRequest<
    unknown,
    Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>
  >) => Promise<RepositoryResponse<Pick<UserEntity, 'id'>>>;
  updateUserById: ({
    queryArgs,
  }: RepositoryRequest<
    Pick<UserEntity, 'id'>,
    Partial<Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>>
  >) => Promise<RepositoryResponse<Pick<UserEntity, 'id'>>>;
}

export {
  type CreateUserRequest,
  createUserSchema,
  type CreateUserSessionRequest,
  createUserSessionSchema,
  type UserDTO,
  UserDTOMapper,
  type UserEntity,
  type UserRepository,
};
