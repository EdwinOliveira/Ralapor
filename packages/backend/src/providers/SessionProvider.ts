import type { Request, Response } from "express";
import type { UserEntity } from "../domains/User";

type SessionProperty = "users";

type SessionData = Partial<
	Pick<
		UserEntity,
		"id" | "username" | "email" | "phoneNumber" | "phoneNumberCode"
	>
>;

const SessionProvider = (request: Request, _response: Response) => {
	const addToSession = (property: SessionProperty, data: SessionData) => {
		if (request.session[property]) {
			request.session[property].push(data);
		} else {
			request.session[property] = [data];
		}
	};

	const updateSession = (property: SessionProperty, data: SessionData) => {
		if (request.session[property]) {
			const foundUserIndex = request.session[property].findIndex(
				(user) => user.id === data.id,
			);

			request.session[property][foundUserIndex] = {
				...request.session[property][foundUserIndex],
				...data,
			};
		} else {
			addToSession(property, data);
		}
	};

	const destroySession = (property: SessionProperty, data: SessionData) => {
		if (request.session[property] === undefined) {
			return;
		}

		const filteredUsers = request.session[property].filter(
			(user) => user.id !== data.id,
		);

		request.session[property] = filteredUsers;
	};

	const destroySessions = () => {
		request.session.destroy((error) => {
			if (error) return { statusCode: 500 };
		});
	};

	return { addToSession, updateSession, destroySession, destroySessions };
};

export { SessionProvider };
