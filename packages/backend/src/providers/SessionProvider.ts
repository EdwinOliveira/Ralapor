import type { Request, Response } from 'express';

import { RandomProvider } from './RandomProvider';

type Cookies = {
  sid: string | undefined;
};

const SessionProvider = (request?: Request, response?: Response) => {
  const { createExpirationTime } = RandomProvider();

  return {
    addToSession: (sessionId: string, remembersDevice: boolean) =>
      response?.cookie('sid', sessionId, {
        httpOnly: true,
        maxAge: remembersDevice ? createExpirationTime() : undefined,
        sameSite: 'lax',
      }),
    clearSession: () => {
      response?.clearCookie('sid');
    },
    getSession: () => request?.cookies as Cookies | undefined,
  };
};

export { SessionProvider };
