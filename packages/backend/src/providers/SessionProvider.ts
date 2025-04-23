import type { Request, Response } from "express";
import { RandomProvider } from "./RandomProvider";

type Cookies = {
	sid: string | undefined;
};

const SessionProvider = (request?: Request, response?: Response) => {
	const { createExpirationTime } = RandomProvider();

	return {
		getSession: (): Cookies => request?.cookies as Cookies,
		addToSession: (sessionId: string) =>
			response?.cookie("sid", sessionId, {
				httpOnly: true,
				sameSite: "lax",
				maxAge: createExpirationTime(),
			}),
	};
};

export { SessionProvider };
