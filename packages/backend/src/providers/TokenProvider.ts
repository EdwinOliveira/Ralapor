import { type JwtPayload, sign, TokenExpiredError, verify } from "jsonwebtoken";

type CheckTokenResponse = {
	sessionId: string;
	iat: number;
	exp: number;
};

const TokenProvider = () => {
	return {
		createToken: (
			data: JwtPayload,
			expiresIn: "7d",
			tokenSecret = "JWTtokenSecret",
		) => {
			return new Promise<string | undefined>((resolve) => {
				sign(data, tokenSecret, { expiresIn }, (error, token) => {
					if (error !== null) return resolve(error.name);
					return resolve(token);
				});
			});
		},
		checkToken: (token: string, tokenSecret = "JWTtokenSecret") => {
			return new Promise<
				CheckTokenResponse | "TokenExpiredError" | "TokenInvalidError"
			>((resolve) => {
				verify(token, tokenSecret, (error, data) => {
					if (error?.inner instanceof TokenExpiredError) {
						return resolve("TokenExpiredError");
					}

					return data !== undefined
						? resolve(data as CheckTokenResponse)
						: resolve("TokenInvalidError");
				});
			});
		},
	};
};

export { TokenProvider };
