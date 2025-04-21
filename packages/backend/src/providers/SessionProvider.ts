import type { Request, Response } from "express";
import type { UserEntity } from "../domains/User";

type SessionProperty = "user";

type SessionData = Partial<
	Pick<
		UserEntity,
		"id" | "username" | "email" | "phoneNumber" | "phoneNumberCode"
	>
>;

const SessionProvider = (request?: Request, response?: Response) => {
	const findSession = () => {
		if (request === undefined || response === undefined) {
			return;
		}

		return request.session;
	};

	const addToSession = (property: SessionProperty, data: SessionData) => {
		if (request === undefined || response === undefined) {
			return;
		}

		request.session[property] = data;
	};

	const updateSession = (property: SessionProperty, data: SessionData) => {
		if (request === undefined || response === undefined) {
			return;
		}

		if (request.session[property] === undefined) {
			return;
		}

		addToSession(property, data);
	};

	const destroySession = () => {
		if (request === undefined || response === undefined) {
			return;
		}

		request.session.destroy((error) => {
			if (error) return { statusCode: 500 };
		});
	};

	const regenerateSession = () => {
		if (request === undefined || response === undefined) {
			return;
		}

		request.session.regenerate((error) => {
			if (error) return { statusCode: 500 };
		});
	};

	return {
		findSession,
		addToSession,
		updateSession,
		destroySession,
		regenerateSession,
	};
};

export { SessionProvider };
