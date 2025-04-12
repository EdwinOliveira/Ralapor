import { useState } from "react";
import { FetchProvider } from "../providers/fetchProvider";
import type { UserEntity } from "../state/UserState";

type UpdateUserByUsernameOrEmailOrPhoneNumberRequest = Partial<
	Pick<UserEntity, "username" | "email" | "phoneNumber">
>;

const useUpdateUserByUsernameOrEmailOrPhoneNumber = () => {
	const { createRequest } = FetchProvider();
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
