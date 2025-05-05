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
		try {
			const response = await createRequest({
				httpRoute: "users/:username/:email/:phoneNumber/access-code",
				httpMethod: "PUT",
				httpParams: request,
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
		} catch (error) {
			console.log(error);
		}
	};

	return { updateUserByUsernameOrEmailOrPhoneNumber };
};

export {
	useUpdateUserByUsernameOrEmailOrPhoneNumber,
	type UpdateUserByUsernameOrEmailOrPhoneNumberRequest,
};
