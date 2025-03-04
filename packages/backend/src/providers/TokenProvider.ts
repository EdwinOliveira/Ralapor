import { type JwtPayload, sign, verify } from "jsonwebtoken";

const TokenProvider = () => {
	return {
		createToken: (
			data: JwtPayload,
			expiresIn: "1h" | "1d",
			tokenSecret = "JWTtokenSecret",
		) => sign(data, tokenSecret, { expiresIn }),
		checkToken: (token: string, tokenSecret = "JWTtokenSecret") =>
			verify(token, tokenSecret),
	};
};

export { TokenProvider };
