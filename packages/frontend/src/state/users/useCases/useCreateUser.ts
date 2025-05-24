import { useFetch } from "../../../hooks/useFetch";

type CreateUserRequest = {
	username: string;
	email: string;
	phoneNumber: string;
	phoneNumberCode: string;
};

const useCreateUser = () => {
	const { createRequest } = useFetch();

	const createUser = async (request: CreateUserRequest) => {
		const response = await createRequest({
			httpRoute: "/users",
			httpMethod: "POST",
			httpBody: request,
		});

		if (response.ok === false) {
			return;
		}

		return;
	};

	return { createUser };
};

export { useCreateUser, type CreateUserRequest };
