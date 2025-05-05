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
		try {
			const response = await createRequest({
				httpRoute: "users",
				httpMethod: "POST",
				httpBody: request,
			});

			if (response.ok === false) {
				return;
			}

			return;
		} catch (error) {
			return;
		}
	};

	return { createUser };
};

export { useCreateUser, type CreateUserRequest };
