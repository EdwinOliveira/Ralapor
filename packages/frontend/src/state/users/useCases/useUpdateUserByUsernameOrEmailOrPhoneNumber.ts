import { useFetch } from "../../../hooks/useFetch";
import { useUserStore, type User } from "../useUserStore";

type UpdateUserByUsernameOrEmailOrPhoneNumberRequest = {
	username: string;
	email: string;
	phoneNumber: string;
};

const useUpdateUserByUsernameOrEmailOrPhoneNumber = () => {
	const { createRequest } = useFetch();
	const { updateUserById } = useUserStore();

	const updateUserByUsernameOrEmailOrPhoneNumber = async (
		request: UpdateUserByUsernameOrEmailOrPhoneNumberRequest,
	) => {
		const response = await createRequest({
			httpRoute: "/users/access-code",
			httpMethod: "PUT",
			httpBody: request,
		});

		if (response.ok === false) {
			return { status: response.status };
		}

		const updatedUser: Pick<User, "id" | "updatedAt"> = await response.json();

		updateUserById(
			{ id: updatedUser.id },
			{ updatedAt: updatedUser.updatedAt },
		);

		return { status: response.status };
	};

	return { updateUserByUsernameOrEmailOrPhoneNumber };
};

export {
	useUpdateUserByUsernameOrEmailOrPhoneNumber,
	type UpdateUserByUsernameOrEmailOrPhoneNumberRequest,
};
