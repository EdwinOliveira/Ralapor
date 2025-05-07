import { useFetch } from "../../../hooks/useFetch";

type FindSessionResponse = {
	sessionId: string;
	userId: number;
	roleId: number;
	expiresIn: number;
	refreshToken: string;
};

const useFindSession = () => {
	const { createRequest } = useFetch();

	const findSession = async () => {
		const response = await createRequest({
			httpRoute: "users/sessions",
			httpMethod: "GET",
		});

		if (response.ok === false) {
			return;
		}

		return (await response.json()) as FindSessionResponse;
	};

	return { findSession };
};

export { useFindSession };
