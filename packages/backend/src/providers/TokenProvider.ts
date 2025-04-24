import { type JwtPayload, sign, verify } from "jsonwebtoken";

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
					if (error !== null) return resolve(undefined);
					return resolve(token);
				});
			});
		},
		checkToken: (token: string, tokenSecret = "JWTtokenSecret") => {
			return new Promise<CheckTokenResponse | undefined>((resolve) => {
				verify(token, tokenSecret, (error, data) => {
					if (error !== null) return resolve(undefined);
					return resolve(data as CheckTokenResponse | undefined);
				});
			});
		},
	};
};

export { TokenProvider };
