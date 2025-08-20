import { UserDTO, UserEntity } from '.';

const emailMock = 'dummyEmail@dummyEmail.com';
const invalidEmailMock = 'dummyEmail';
const phoneNumberMock = 'dummyPhoneNumber';
const phoneNumberCodeMock = '+351';
const invalidPhoneNumberCodeMock = '+351';
const idMock = 1;
const usernameMock = 'dummyUsername';
const accessCodeMock = 'dummyAccessCode';
const createdAtMock = new Date().getTime();
const updatedAtMock = new Date().getTime();

const userEntityMock = {
  accessCode: accessCodeMock,
  createdAt: createdAtMock,
  email: emailMock,
  id: idMock,
  phoneNumber: phoneNumberMock,
  phoneNumberCode: phoneNumberCodeMock,
  roleId: idMock,
  updatedAt: updatedAtMock,
  username: usernameMock,
} satisfies UserEntity;

const userDTOMock = {
  createdAt: createdAtMock,
  email: emailMock,
  id: idMock,
  phoneNumber: phoneNumberMock,
  phoneNumberCode: phoneNumberCodeMock,
  roleId: idMock,
  updatedAt: updatedAtMock,
  username: usernameMock,
} satisfies UserDTO;

export {
  emailMock,
  invalidEmailMock,
  invalidPhoneNumberCodeMock,
  phoneNumberCodeMock,
  phoneNumberMock,
  userDTOMock,
  userEntityMock,
  usernameMock,
};
