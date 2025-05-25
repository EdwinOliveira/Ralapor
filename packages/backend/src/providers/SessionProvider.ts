import type { Request, Response } from "express";
import { RandomProvider } from "./RandomProvider";

type Cookies = {
	sid: string | undefined;
};

const SessionProvider = (request?: Request, response?: Response) => {
	const { createExpirationTime } = RandomProvider();

	return {
		getSession: () => request?.cookies as Cookies | undefined,
		addToSession: (sessionId: string, remembersDevice: boolean) =>
			response?.cookie("sid", sessionId, {
				httpOnly: true,
				sameSite: "lax",
				maxAge: remembersDevice ? createExpirationTime() : undefined,
			}),
		clearSession: () => {
			response?.clearCookie("sid");
		},
	};
};

export { SessionProvider };
