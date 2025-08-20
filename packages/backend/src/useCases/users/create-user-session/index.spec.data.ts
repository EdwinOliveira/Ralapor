import { UserEntity } from '../../../domains/user';

const randomNumber = Math.floor(Math.random() * 1000) + 1;

const idMock = randomNumber;
const roleIdMock = randomNumber;
const emailMock = 'dummyEmail@dummyEmail.com';
const phoneNumberMock = 'dummyPhoneNumber';
const phoneNumberCodeMock = '+351';
const usernameMock = 'dummyUsername';
const invalidEmailSyntaxMock = 'dummyInvalidEmailSyntax';
const invalidEmailMock = randomNumber;
const invalidUsernameMock = randomNumber;
const invalidPhoneNumberMock = randomNumber;
const accessCodeMock = 'dummyAccessCode';
const createdAtMock = new Date().getTime();
const updatedAtMock = new Date().getTime();

const bodyMock = {
  accessCode: accessCodeMock,
  email: emailMock,
  phoneNumber: phoneNumberMock,
  phoneNumberCode: phoneNumberCodeMock,
  username: usernameMock,
};

const userEntityMock = {
  accessCode: accessCodeMock,
  createdAt: createdAtMock,
  email: emailMock,
  id: idMock,
  phoneNumber: phoneNumberMock,
  phoneNumberCode: phoneNumberCodeMock,
  roleId: roleIdMock,
  updatedAt: updatedAtMock,
  username: usernameMock,
} satisfies UserEntity;

export {
  bodyMock,
  idMock,
  invalidEmailMock,
  invalidEmailSyntaxMock,
  invalidPhoneNumberMock,
  invalidUsernameMock,
  userEntityMock,
};
