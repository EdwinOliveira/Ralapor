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

export { type UserDTO, UserDTOMapper, type UserEntity };
