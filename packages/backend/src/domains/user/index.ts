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
    email: z.string().nonempty(),
    phoneNumber: z.string().nonempty(),
    phoneNumberCode: z.enum(['+351', '+44']),
    username: z.string().nonempty(),
  }),
});

type CreateUserRequest = z.infer<typeof createUserSchema>;

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
  type UserDTO,
  UserDTOMapper,
  type UserEntity,
  type UserRepository,
};
