import { useFetch } from "../../../hooks/useFetch";
import { useUserStore, type User } from "../useUserStore";

type FindUserByAccessCodeRequest = {
	accessCode: string;
};

const useFindUserByAccessCode = () => {
	const { createRequest } = useFetch();
	const { addUser } = useUserStore();

	const findUserByAccessCode = async (request: FindUserByAccessCodeRequest) => {
		try {
			const response = await createRequest({
				httpRoute: "users/access-code/:accessCode",
				httpMethod: "GET",
				httpParams: request,
			});

			if (response.ok === false) {
				return;
			}

			const foundUser: User = await response.json();
			addUser(foundUser);
		} catch (error) {
			console.log(error);
		}
	};

	return { findUserByAccessCode };
};

export { useFindUserByAccessCode, type FindUserByAccessCodeRequest };
