import { useFetch } from "../../../hooks/useFetch";
import { useUserStore, type User } from "../useUserStore";

type CreateUserSessionRequest = {
	accessCode: string;
};

const useCreateUserSession = () => {
	const { createRequest } = useFetch();
	const { addUser } = useUserStore();

	const createUserSession = async (request: CreateUserSessionRequest) => {
		const response = await createRequest({
			httpRoute: "/users/access-code",
			httpMethod: "POST",
			httpBody: request,
		});

		if (response.ok === false) {
			return;
		}

		const foundUser: User = await response.json();
		addUser(foundUser);
	};

	return { createUserSession };
};

export { useCreateUserSession, type CreateUserSessionRequest };
