import { useState } from "react";
import { FetchProvider } from "../providers/fetchProvider";
import type { UserEntity } from "../state/userState";

type CreateUserRequest = Pick<
	UserEntity,
	"username" | "email" | "phoneNumber" | "phoneNumberCode"
>;

const useCreateUser = () => {
	const { createRequest } = FetchProvider();
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
