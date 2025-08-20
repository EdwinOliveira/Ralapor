import { type Request, type Response } from 'express';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { CreateUserUseCase } from '.';
import {
  bodyMock,
  idMock,
  invalidEmailMock,
  invalidEmailSyntaxMock,
  invalidPhoneNumberMock,
  invalidUsernameMock,
} from './index.spec.data';

vi.mock('../../../providers/RandomProvider', () => ({
  RandomProvider: () => ({
    ...vi.importActual,
    createAccessCode: vi.fn(),
  }),
}));

vi.mock('../../../providers/HashProvider', () => ({
  HashProvider: () => ({
    ...vi.importActual,
    hash: vi.fn(),
  }),
}));

const createUserMock = vi.fn();
const findUserByUsernameOrEmailOrPhoneNumberMock = vi.fn();

vi.mock('../../../repositories/UserRemoteRepository', () => ({
  UserRemoteRepository: () => ({
    ...vi.importActual,
    createUser: createUserMock,
    findUserByUsernameOrEmailOrPhoneNumber:
      findUserByUsernameOrEmailOrPhoneNumberMock,
  }),
}));

describe('CreateUserUseCase', () => {
  const createUser = (override: Record<string, unknown>) => {
    const request = {
      body: override,
    } as unknown as Request;

    const response = {
      status: () => ({ json: vi.fn() }),
    } as unknown as Response;

    return CreateUserUseCase({ request, response }).createUser();
  };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('@returns {{ 200 }} and {{ ID }}', async () => {
    findUserByUsernameOrEmailOrPhoneNumberMock.mockResolvedValue({
      affectedIds: [],
    });

    createUserMock.mockResolvedValue({ affectedIds: [idMock] });

    const response = await createUser(bodyMock);
    expect(response).toEqual({ data: { id: idMock }, status: 201 });
  });

  it('@returns {{ 409 }}', async () => {
    findUserByUsernameOrEmailOrPhoneNumberMock.mockResolvedValue({
      affectedIds: [idMock],
    });

    const response = await createUser(bodyMock);
    expect(response).toEqual({ status: 409 });
  });

  it.each([
    [
      { ...bodyMock, email: invalidEmailMock },
      { ...bodyMock, email: invalidEmailSyntaxMock },
      { ...bodyMock, username: invalidUsernameMock },
      { ...bodyMock, phoneNumber: invalidPhoneNumberMock },
    ],
  ])('@returns {{ 400 }}', async (data) => {
    const response = await createUser(data);
    expect(response).toMatchObject({ status: 400 });
  });

  it('@returns {{ 500 }}', async () => {
    findUserByUsernameOrEmailOrPhoneNumberMock.mockRejectedValue(new Error(''));

    const response = await createUser(bodyMock);
    expect(response).toEqual({ status: 500 });
  });
});
