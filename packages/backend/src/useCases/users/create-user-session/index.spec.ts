import { type Request, type Response } from 'express';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CreateUserSessionUseCase } from '.';
import {
  bodyMock,
  idMock,
  invalidEmailMock,
  invalidEmailSyntaxMock,
  userEntityMock,
} from './index.spec.data';

const compareMock = vi.fn();

vi.mock('../../../providers/HashProvider', () => ({
  HashProvider: () => ({
    ...vi.importActual,
    compare: compareMock,
  }),
}));

const findUserByUsernameOrEmailOrPhoneNumberMock = vi.fn();

vi.mock('../../../repositories/UserRemoteRepository', () => ({
  UserRemoteRepository: () => ({
    ...vi.importActual,
    findUserByUsernameOrEmailOrPhoneNumber:
      findUserByUsernameOrEmailOrPhoneNumberMock,
  }),
}));

describe('CreateUserSessionUseCase', () => {
  const createUserSession = (override: Record<string, unknown>) => {
    const request = {
      body: override,
    } as unknown as Request;

    const response = {
      status: () => ({ json: vi.fn() }),
    } as unknown as Response;

    return CreateUserSessionUseCase({ request, response }).createUserSession();
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('@returns {{ 201 }} and {{ ID }}', async () => {
    findUserByUsernameOrEmailOrPhoneNumberMock.mockResolvedValue({
      affectedIds: [idMock],
      affectedRows: [userEntityMock],
    });

    compareMock.mockResolvedValue(true);

    const response = await createUserSession(bodyMock);
    expect(response).toEqual({ data: { id: idMock }, status: 201 });
  });

  it.each([
    [
      { ...bodyMock, email: invalidEmailMock },
      { ...bodyMock, email: invalidEmailSyntaxMock },
      { ...bodyMock, email: '' },
      { ...bodyMock, username: '' },
      { ...bodyMock, phoneNumber: '' },
      { ...bodyMock, phoneNumberCode: '' },
    ],
  ])('@returns {{ 400 }}', async (data) => {
    const response = await createUserSession(data);
    expect(response).toMatchObject({ status: 400 });
  });

  it('@returns {{ 401 }}', async () => {
    findUserByUsernameOrEmailOrPhoneNumberMock.mockResolvedValue({
      affectedIds: [idMock],
      affectedRows: [userEntityMock],
    });

    compareMock.mockResolvedValue(false);

    const response = await createUserSession(bodyMock);
    expect(response).toEqual({ status: 401 });
  });

  it('@returns {{ 404 }}', async () => {
    findUserByUsernameOrEmailOrPhoneNumberMock.mockResolvedValue({
      affectedIds: [],
      affectedRows: [],
    });

    const response = await createUserSession(bodyMock);
    expect(response).toEqual({ status: 404 });
  });

  it('@returns {{ 500 }}', async () => {
    findUserByUsernameOrEmailOrPhoneNumberMock.mockRejectedValue(new Error(''));

    const response = await createUserSession(bodyMock);
    expect(response).toEqual({ status: 500 });
  });
});
