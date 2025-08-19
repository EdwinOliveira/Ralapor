type RoleEntity = {
  createdAt: number;
  designation: string;
  id: number;
  updatedAt: number;
};

type RoleDTO = Readonly<RoleEntity>;

const RoleDTOMapper = () => {
  return {
    mapToDTO: (entity: RoleEntity): RoleDTO => ({
      createdAt: entity.createdAt,
      designation: entity.designation,
      id: entity.id,
      updatedAt: entity.updatedAt,
    }),
  };
};

export { type RoleDTO, RoleDTOMapper, type RoleEntity };
