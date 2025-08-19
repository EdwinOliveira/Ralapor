import { z } from 'zod';

import type {
  RepositoryRequest,
  RepositoryResponse,
} from '../signatures/Repository';

type RoleEntity = {
  createdAt: string;
  designation: 'publisher' | 'consumer' | 'publisher-consumer';
  id: number;
  updatedAt: string;
};

type RoleDTO = Readonly<RoleEntity>;

const roleDTOMapper = (entity: RoleEntity): RoleDTO => {
  return {
    createdAt: entity.createdAt,
    designation: entity.designation,
    id: entity.id,
    updatedAt: entity.updatedAt,
  };
};

const findRoleByIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type FindRoleByIdRequest = z.infer<typeof findRoleByIdSchema>;

const findRoleByDesignationSchema = z.object({
  params: z.object({
    designation: z.enum(['publisher', 'consumer', 'publisher-consumer']),
  }),
});

type FindRoleByDesignationRequest = z.infer<typeof findRoleByDesignationSchema>;

const createRoleSchema = z.object({
  body: z.object({
    designation: z.enum(['publisher', 'consumer', 'publisher-consumer']),
  }),
});

type CreateRoleRequest = z.infer<typeof createRoleSchema>;

const updateRoleByIdSchema = z.object({
  body: z.object({
    designation: z.enum(['publisher', 'consumer', 'publisher-consumer']),
  }),
  params: z.object({
    id: z
      .string()
      .transform((id) => Number.parseInt(id))
      .refine((id) => !Number.isNaN(id)),
  }),
});

type UpdateRoleByIdRequest = z.infer<typeof updateRoleByIdSchema>;

interface RoleRepository {
  findRoles(): Promise<RepositoryResponse<RoleEntity>>;
  findRoleById({
    query,
  }: RepositoryRequest<Pick<RoleEntity, 'id'>>): Promise<
    RepositoryResponse<RoleEntity>
  >;
  findRoleByDesignation({
    query,
  }: RepositoryRequest<Pick<RoleEntity, 'designation'>>): Promise<
    RepositoryResponse<RoleEntity>
  >;
  createRole({
    args,
  }: RepositoryRequest<unknown, Pick<RoleEntity, 'designation'>>): Promise<
    RepositoryResponse<unknown>
  >;
  updateRoleById({
    args,
    query,
  }: RepositoryRequest<
    Pick<RoleEntity, 'id'>,
    Partial<Omit<RoleEntity, 'id' | 'createdAt' | 'updatedAt'>>
  >): Promise<RepositoryResponse<Pick<RoleEntity, 'updatedAt'>>>;
}

export {
  type CreateRoleRequest,
  createRoleSchema,
  type FindRoleByDesignationRequest,
  findRoleByDesignationSchema,
  type FindRoleByIdRequest,
  findRoleByIdSchema,
  type RoleDTO,
  roleDTOMapper,
  type RoleEntity,
  type RoleRepository,
  type UpdateRoleByIdRequest,
  updateRoleByIdSchema,
};
