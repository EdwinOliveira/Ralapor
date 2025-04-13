import { useState } from "react";
import { useFetchProvider } from "../providers/useFetchProvider";
import type { UserEntity } from "../state/userState";

type UpdateUserByUsernameOrEmailOrPhoneNumberRequest = Partial<
	Pick<UserEntity, "username" | "email" | "phoneNumber">
>;

const useUpdateUserByUsernameOrEmailOrPhoneNumber = () => {
	const { createRequest } = useFetchProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const updateUserByUsernameOrEmailOrPhoneNumber = async ({
		username,
		email,
		phoneNumber,
	}: UpdateUserByUsernameOrEmailOrPhoneNumberRequest) => {
		setIsLoading(true);

		await createRequest({
			httpRoute: "users/access-code/:username/:email/:phoneNumber",
			httpMethod: "PUT",
			httpQueries: {},
			httpParams: { username, email, phoneNumber },
			httpBody: {},
		});

		setIsLoading(false);
	};

	return {
		updateUserByUsernameOrEmailOrPhoneNumber,
		isLoading,
	};
};

export { useUpdateUserByUsernameOrEmailOrPhoneNumber };
