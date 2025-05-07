import { useFetch } from "../../../hooks/useFetch";

type FindSessionResponse = {
	sessionId: string;
	userId: number;
	roleId: number;
	expiresIn: number;
	refreshToken: string;
};

const useFindUserSession = () => {
	const { createRequest } = useFetch();

	const findUserSession = async () => {
		const response = await createRequest({
			httpRoute: "users/sessions",
			httpMethod: "GET",
		});

		if (response.ok === false) {
			return;
		}

		return (await response.json()) as FindSessionResponse;
	};

	return { findUserSession };
};

export { useFindUserSession };
