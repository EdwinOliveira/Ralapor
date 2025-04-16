import { useFetchProvider } from "../providers/useFetchProvider";
import type { UserEntity } from "../state/useUserState";

type UpdateUserByUsernameOrEmailOrPhoneNumberRequest = Partial<
	Pick<UserEntity, "username" | "email" | "phoneNumber">
>;

const useUpdateUserByUsernameOrEmailOrPhoneNumber = () => {
	const { createRequest } = useFetchProvider();

	const updateUserByUsernameOrEmailOrPhoneNumber = async ({
		username,
		email,
		phoneNumber,
	}: UpdateUserByUsernameOrEmailOrPhoneNumberRequest) => {
		await createRequest({
			httpRoute: "users/access-code/:username/:email/:phoneNumber",
			httpMethod: "PUT",
			httpQueries: {},
			httpParams: { username, email, phoneNumber },
			httpBody: {},
		});
	};

	return { updateUserByUsernameOrEmailOrPhoneNumber };
};

export { useUpdateUserByUsernameOrEmailOrPhoneNumber };
