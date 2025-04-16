import { useFetchProvider } from "../providers/useFetchProvider";
import type { UserEntity } from "../state/useUserState";

type CreateUserRequest = Pick<
	UserEntity,
	"username" | "email" | "phoneNumber" | "phoneNumberCode"
>;

const useCreateUser = () => {
	const { createRequest } = useFetchProvider();

	const createUser = async ({
		username,
		email,
		phoneNumber,
		phoneNumberCode,
	}: CreateUserRequest) => {
		await createRequest({
			httpRoute: "users",
			httpMethod: "POST",
			httpQueries: {},
			httpParams: {},
			httpBody: { username, email, phoneNumber, phoneNumberCode },
		});
	};

	return { createUser };
};

export { useCreateUser };
