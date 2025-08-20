const randomNumber = Math.floor(Math.random() * 1000) + 1;

const idMock = randomNumber;
const emailMock = 'dummyEmail@dummyEmail.com';
const phoneNumberMock = 'dummyPhoneNumber';
const phoneNumberCodeMock = '+351';
const usernameMock = 'dummyUsername';
const invalidEmailSyntaxMock = 'dummyInvalidEmailSyntax';
const invalidEmailMock = randomNumber;
const invalidUsernameMock = randomNumber;
const invalidPhoneNumberMock = randomNumber;

const bodyMock = {
  email: emailMock,
  phoneNumber: phoneNumberMock,
  phoneNumberCode: phoneNumberCodeMock,
  username: usernameMock,
};

export {
  bodyMock,
  idMock,
  invalidEmailMock,
  invalidEmailSyntaxMock,
  invalidPhoneNumberMock,
  invalidUsernameMock,
};
