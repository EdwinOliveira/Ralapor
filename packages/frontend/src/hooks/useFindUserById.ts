import { useDispatch } from "react-redux";
import { useFetchProvider } from "../providers/useFetchProvider";
import { addUser, type UserEntity } from "../state/useUserState";

type FindUserByIdRequest = Pick<UserEntity, "id">;

const useFindUserById = () => {
	const dispatch = useDispatch();
	const { createRequest } = useFetchProvider();

	const findUserById = async ({ id }: FindUserByIdRequest) => {
		const response = await createRequest({
			httpRoute: "users/:id",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: { id },
			httpBody: {},
		});

		const foundUser = (await response.json()) as UserEntity;
		const action = addUser(foundUser);
		dispatch(action);
	};

	return { findUserById };
};

export { useFindUserById };
