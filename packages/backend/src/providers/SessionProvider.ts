import type { Request, Response } from "express";
import type { UserEntity } from "../domains/User";

type SessionProperty = "user";

type SessionData = Partial<
	Pick<
		UserEntity,
		"id" | "username" | "email" | "phoneNumber" | "phoneNumberCode"
	>
>;

const SessionProvider = (request: Request, _response: Response) => {
	const addToSession = (property: SessionProperty, data: SessionData) => {
		request.session[property] = data;
	};

	const updateSession = (property: SessionProperty, data: SessionData) => {
		if (request.session[property] === undefined) {
			return;
		}

		addToSession(property, data);
	};

	const destroySession = () => {
		request.session.destroy((error) => {
			if (error) return { statusCode: 500 };
		});
	};

	const regenerateSession = () => {
		request.session.regenerate((error) => {
			if (error) return { statusCode: 500 };
		});
	};

	return {
		addToSession,
		updateSession,
		destroySession,
		regenerateSession,
	};
};

export { SessionProvider };
