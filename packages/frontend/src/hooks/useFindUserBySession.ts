import { useDispatch } from "react-redux";
import { useFetchProvider } from "../providers/useFetchProvider";
import { addUser, type UserEntity } from "../state/useUserState";

const useFindUserBySession = () => {
	const dispatch = useDispatch();
	const { createRequest } = useFetchProvider();

	const findUserBySession = async () => {
		const response = await createRequest({
			httpRoute: "users/session",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: {},
			httpBody: {},
		});

		const foundUser = (await response.json()) as UserEntity;
		const action = addUser(foundUser);
		console.log(foundUser);
		dispatch(action);
	};

	return { findUserBySession };
};

export { useFindUserBySession };
