import { RoleDTO, RoleEntity } from '.';

const idMock = 1;
const dummyDesignation = 'dummyDesignation';
const createdAtMock = new Date().getTime();
const updatedAtMock = new Date().getTime();

const roleEntityMock = {
  createdAt: createdAtMock,
  designation: dummyDesignation,
  id: idMock,
  updatedAt: updatedAtMock,
} satisfies RoleEntity;

const roleDTOMock = {
  createdAt: createdAtMock,
  designation: dummyDesignation,
  id: idMock,
  updatedAt: updatedAtMock,
} satisfies RoleDTO;

export { roleDTOMock, roleEntityMock };
