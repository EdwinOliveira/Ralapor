import { afterEach, describe, expect, it, vi } from 'vitest';

import { createUserSchema, UserDTOMapper } from '.';
import {
  emailMock,
  invalidEmailMock,
  invalidPhoneNumberCodeMock,
  phoneNumberCodeMock,
  phoneNumberMock,
  userDTOMock,
  userEntityMock,
  usernameMock,
} from './index.spec.data';

describe('User Domain', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('@method UserDTOMapper', () => {
    const { mapToDTO } = UserDTOMapper();

    it('@returns UserDTO', () => {
      expect(mapToDTO(userEntityMock)).toEqual(userDTOMock);
    });
  });

  describe('@schema createUserSchema', () => {
    const validScenarios = [
      {
        schema: {
          email: emailMock,
          phoneNumber: phoneNumberMock,
          phoneNumberCode: phoneNumberCodeMock,
          username: usernameMock,
        },
      },
    ];

    const invalidScenarios = [
      {
        schema: {
          email: invalidEmailMock,
          phoneNumber: phoneNumberMock,
          phoneNumberCode: phoneNumberCodeMock,
          username: usernameMock,
        },
      },
      {
        schema: {
          email: emailMock,
          phoneNumber: phoneNumberMock,
          phoneNumberCode: invalidPhoneNumberCodeMock,
          username: usernameMock,
        },
      },
      {
        schema: {
          phoneNumber: phoneNumberMock,
          phoneNumberCode: phoneNumberCodeMock,
          username: usernameMock,
        },
      },
      {
        schema: {
          email: emailMock,
          phoneNumberCode: phoneNumberCodeMock,
          username: usernameMock,
        },
      },
      {
        schema: {
          email: emailMock,
          phoneNumber: phoneNumberMock,
          username: usernameMock,
        },
      },
      {
        schema: {
          email: emailMock,
          phoneNumber: phoneNumberMock,
          phoneNumberCode: phoneNumberCodeMock,
        },
      },
      {
        schema: {},
      },
    ];

    it.each([validScenarios])('@returns schema data', ({ schema }) => {
      const schemaParseResponse = createUserSchema.safeParse({ body: schema });
      expect(schemaParseResponse.success).toBeTruthy();
      expect(schemaParseResponse.data).toEqual({ body: schema });
      expect(schemaParseResponse.error).toBeFalsy();
    });

    it.each([invalidScenarios])('@returns schema errors', ({ schema }) => {
      const schemaParseResponse = createUserSchema.safeParse({ body: schema });
      expect(schemaParseResponse.success).toBeFalsy();
      expect(schemaParseResponse.error).toBeTruthy();
    });
  });
});
