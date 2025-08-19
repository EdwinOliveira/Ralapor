import z from 'zod';

import type {
  RepositoryRequest,
  RepositoryResponse,
} from '../signatures/Repository';

type UserEntity = {
  accessCode: string;
  createdAt: string;
  email: string;
  id: number;
  isPermanentlyTerminated: boolean;
  isTemporaryTerminated: boolean;
  phoneNumber: string;
  phoneNumberCode: string;
  roleId: number;
  updatedAt: string;
  username: string;
};

type UserDTO = Readonly<Omit<UserEntity, 'accessCode'>>;

const userDTOMapper = (entity: UserEntity): UserDTO => {
  return {
    createdAt: entity.createdAt,
    email: entity.email,
    id: entity.id,
    isPermanentlyTerminated: entity.isPermanentlyTerminated,
    isTemporaryTerminated: entity.isTemporaryTerminated,
    phoneNumber: entity.phoneNumber,
    phoneNumberCode: entity.phoneNumberCode,
    roleId: entity.roleId,
    updatedAt: entity.updatedAt,
    username: entity.username,
  };
};

const findUserByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type FindUserByIdRequest = z.infer<typeof findUserByIdSchema>;

const createUserSessionSchema = z.object({
  body: z.object({
    accessCode: z
      .string()
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
    rememberDevice: z.boolean().default(false),
  }),
});

type CreateUserSessionRequest = z.infer<typeof createUserSessionSchema>;

const createUserSessionChallengeSchema = z.object({
  body: z.object({
    alternative: z.enum(['phoneNumber', 'email']),
  }),
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type CreateUserSessionChallengeRequest = z.infer<
  typeof createUserSessionChallengeSchema
>;

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    phoneNumber: z.string(),
    phoneNumberCode: z.enum(['+351', '+44']),
    username: z.string(),
  }),
});

type CreateUserRequest = z.infer<typeof createUserSchema>;

const updateUserByIdSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    isPermanentlyTerminated: z.boolean().optional(),
    isTemporaryTerminated: z.boolean().optional(),
    phoneNumber: z.string().optional(),
    phoneNumberCode: z.enum(['+351', '+44']).optional(),
    roleId: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id))
      .optional(),
    username: z.string().optional(),
  }),
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type UpdateUserByIdRequest = z.infer<typeof updateUserByIdSchema>;

const updateUserAccessCodeByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type UpdateUserAccessCodeByIdRequest = z.infer<
  typeof updateUserAccessCodeByIdSchema
>;

const updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema = z.object({
  body: z.object({
    email: z.string().email().optional(),
    phoneNumber: z.string().optional(),
    username: z.string().optional(),
  }),
});

type UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest = z.infer<
  typeof updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema
>;

const updateUserSessionByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type UpdateUserSessionByIdRequest = z.infer<typeof updateUserSessionByIdSchema>;

const updateUserSessionChallengeIsCheckedSchema = z.object({
  body: z.object({
    code: z.string().optional(),
  }),
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type UpdateUserSessionChallengeIsCheckedRequest = z.infer<
  typeof updateUserSessionChallengeIsCheckedSchema
>;

const updateUserSessionChallengeIsRevokedSchema = z.object({
  body: z.object({
    code: z.string().optional(),
  }),
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type UpdateUserSessionChallengeIsRevokedRequest = z.infer<
  typeof updateUserSessionChallengeIsRevokedSchema
>;

const deleteUserSessionByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type DeleteUserSessionByIdRequest = z.infer<typeof deleteUserSessionByIdSchema>;

interface UserRepository {
  findUsers(): Promise<RepositoryResponse<UserEntity>>;
  findUserById({
    query,
  }: RepositoryRequest<Pick<UserEntity, 'id'>>): Promise<
    RepositoryResponse<UserEntity>
  >;
  findUserByUsernameAndEmailAndPhoneNumber({
    query,
  }: RepositoryRequest<
    Pick<UserEntity, 'username' | 'email' | 'phoneNumber'>
  >): Promise<RepositoryResponse<UserEntity>>;
  findUserByUsernameOrEmailOrPhoneNumber({
    query,
  }: RepositoryRequest<
    Partial<Pick<UserEntity, 'username' | 'email' | 'phoneNumber'>>
  >): Promise<RepositoryResponse<UserEntity>>;
  createUser({
    args,
  }: RepositoryRequest<
    unknown,
    Omit<
      UserEntity,
      | 'id'
      | 'isTemporaryTerminated'
      | 'isPermanentlyTerminated'
      | 'createdAt'
      | 'updatedAt'
    >
  >): Promise<RepositoryResponse<unknown>>;
  updateUserById({
    args,
    query,
  }: RepositoryRequest<
    Pick<UserEntity, 'id'>,
    Partial<Omit<UserEntity, 'id' | 'createdAt'>>
  >): Promise<RepositoryResponse<UserEntity>>;
}

export {
  type CreateUserRequest,
  createUserSchema,
  type CreateUserSessionChallengeRequest,
  createUserSessionChallengeSchema,
  type CreateUserSessionRequest,
  createUserSessionSchema,
  type DeleteUserSessionByIdRequest,
  deleteUserSessionByIdSchema,
  type FindUserByIdRequest,
  findUserByIdSchema,
  type UpdateUserAccessCodeByIdRequest,
  updateUserAccessCodeByIdSchema,
  type UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest,
  updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema,
  type UpdateUserByIdRequest,
  updateUserByIdSchema,
  type UpdateUserSessionByIdRequest,
  updateUserSessionByIdSchema,
  type UpdateUserSessionChallengeIsCheckedRequest,
  updateUserSessionChallengeIsCheckedSchema,
  type UpdateUserSessionChallengeIsRevokedRequest,
  updateUserSessionChallengeIsRevokedSchema,
  type UserDTO,
  userDTOMapper,
  type UserEntity,
  type UserRepository,
};
