import { useFetch } from "./useFetch";

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

			return { status: response.status };
		} catch (error) {
			console.log(error);
		}
	};

	return { createUser };
};

export { useCreateUser, type CreateUserRequest };
