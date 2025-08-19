import { type JwtPayload, sign, TokenExpiredError, verify } from 'jsonwebtoken';

type CheckTokenSignature =
  | 'TokenSuccess'
  | 'TokenExpiredError'
  | 'TokenInvalidError';

type CheckTokenResponse = {
  exp?: number;
  iat?: number;
  sessionId?: string;
  signature: CheckTokenSignature;
};

const TokenProvider = () => {
  return {
    checkToken: (token: string, tokenSecret = 'JWTtokenSecret') => {
      return new Promise<CheckTokenResponse>((resolve) => {
        verify(token, tokenSecret, (error, data) => {
          if (error?.inner instanceof TokenExpiredError) {
            return resolve({ signature: 'TokenExpiredError' });
          }

          return resolve(
            data !== undefined && typeof data !== 'string'
              ? { signature: 'TokenSuccess' }
              : { signature: 'TokenInvalidError' }
          );
        });
      });
    },
    createToken: (
      data: JwtPayload,
      expiresIn: '7d',
      tokenSecret = 'JWTtokenSecret'
    ) => {
      return new Promise<string | undefined>((resolve) => {
        sign(data, tokenSecret, { expiresIn }, (error, token) => {
          if (error !== null) return resolve(error.name);
          return resolve(token);
        });
      });
    },
  };
};

export { type CheckTokenResponse, TokenProvider };
