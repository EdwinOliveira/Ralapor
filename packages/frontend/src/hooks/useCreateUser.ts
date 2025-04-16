import { useState } from "react";
import { useFetchProvider } from "../providers/useFetchProvider";
import type { UserEntity } from "../state/useUserState";

type CreateUserRequest = Pick<
	UserEntity,
	"username" | "email" | "phoneNumber" | "phoneNumberCode"
>;

const useCreateUser = () => {
	const { createRequest } = useFetchProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const createUser = async ({
		username,
		email,
		phoneNumber,
		phoneNumberCode,
	}: CreateUserRequest) => {
		setIsLoading(true);

		await createRequest({
			httpRoute: "users",
			httpMethod: "POST",
			httpQueries: {},
			httpParams: {},
			httpBody: { username, email, phoneNumber, phoneNumberCode },
		});

		setIsLoading(false);
	};

	return {
		createUser,
		isLoading,
	};
};

export { useCreateUser };
