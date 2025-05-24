import { useFetch } from "../../../hooks/useFetch";
import { useUserStore, type User } from "../useUserStore";

type FindUserByAccessCodeRequest = {
	accessCode: string;
};

const useFindUserByAccessCode = () => {
	const { createRequest } = useFetch();
	const { addUser } = useUserStore();

	const findUserByAccessCode = async (request: FindUserByAccessCodeRequest) => {
		const response = await createRequest({
			httpRoute: "/users/access-code",
			httpMethod: "POST",
			httpBody: request,
		});

		if (response.ok === false) {
			return;
		}

		const foundUser: User = await response.json();
		addUser(foundUser);
	};

	return { findUserByAccessCode };
};

export { useFindUserByAccessCode, type FindUserByAccessCodeRequest };
