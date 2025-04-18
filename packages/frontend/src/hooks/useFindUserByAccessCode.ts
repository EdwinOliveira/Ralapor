import { useFetchProvider } from "../providers/useFetchProvider";
import { addUser, type UserEntity } from "../state/useUserState";
import { useDispatch } from "react-redux";

type FindUserByAccessCodeRequest = Pick<UserEntity, "accessCode">;

const useFindUserByAccessCode = () => {
	const dispatch = useDispatch();
	const { createRequest } = useFetchProvider();

	const findUserByAccessCode = async ({
		accessCode,
	}: FindUserByAccessCodeRequest) => {
		const response = await createRequest({
			httpRoute: "users/access-code/:accessCode",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: { accessCode },
			httpBody: {},
		});

		const foundUser = (await response.json()) as UserEntity;
		const action = addUser(foundUser);
		dispatch(action);
	};

	return { findUserByAccessCode };
};

export { useFindUserByAccessCode };
