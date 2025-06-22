import { type JwtPayload, TokenExpiredError, sign, verify } from "jsonwebtoken";

type CheckTokenSignature =
	| "TokenSuccess"
	| "TokenExpiredError"
	| "TokenInvalidError";

type CheckTokenResponse = {
	signature: CheckTokenSignature;
	sessionId?: string;
	iat?: number;
	exp?: number;
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
			return new Promise<CheckTokenResponse>((resolve) => {
				verify(token, tokenSecret, (error, data) => {
					if (error?.inner instanceof TokenExpiredError) {
						return resolve({ signature: "TokenExpiredError" });
					}

					return resolve(
						data !== undefined && typeof data !== "string"
							? { signature: "TokenSuccess" }
							: { signature: "TokenInvalidError" },
					);
				});
			});
		},
	};
};

export { TokenProvider, type CheckTokenResponse };
