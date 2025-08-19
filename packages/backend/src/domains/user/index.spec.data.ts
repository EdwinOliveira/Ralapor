import { UserDTO, UserEntity } from '.';

const emailMock = 'dummyEmail@dummyEmail.com';
const phoneNumberMock = 'dummyPhoneNumber';
const phoneNumberCodeMock = '+351';
const idMock = 1;
const dummyUsername = 'dummyUsername';
const dummyAccessCode = 'dummyAccessCode';
const createdAtMock = new Date().getTime();
const updatedAtMock = new Date().getTime();

const userEntityMock = {
  accessCode: dummyAccessCode,
  createdAt: createdAtMock,
  email: emailMock,
  id: idMock,
  phoneNumber: phoneNumberMock,
  phoneNumberCode: phoneNumberCodeMock,
  roleId: idMock,
  updatedAt: updatedAtMock,
  username: dummyUsername,
} satisfies UserEntity;

const userDTOMock = {
  createdAt: createdAtMock,
  email: emailMock,
  id: idMock,
  phoneNumber: phoneNumberMock,
  phoneNumberCode: phoneNumberCodeMock,
  roleId: idMock,
  updatedAt: updatedAtMock,
  username: dummyUsername,
} satisfies UserDTO;

export { userDTOMock, userEntityMock };
