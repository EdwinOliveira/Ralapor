import { useFetch } from "../../../hooks/useFetch";
import type { User } from "../useUserStore";

type FindUserByIdRequest = {
	id: number;
};

const useFindUserById = () => {
	const { createRequest } = useFetch();

	const findUserById = async (request: FindUserByIdRequest) => {
		const response = await createRequest({
			httpRoute: "/users/:id",
			httpMethod: "GET",
			httpParams: request,
		});

		if (response.ok === false) {
			return;
		}

		return (await response.json()) as User;
	};

	return { findUserById };
};

export { useFindUserById, type FindUserByIdRequest };
