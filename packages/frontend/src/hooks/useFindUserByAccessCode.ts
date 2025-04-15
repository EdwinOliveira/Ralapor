import { useState } from "react";
import { useFetchProvider } from "../providers/useFetchProvider";
import { UserState, type UserEntity } from "../state/UserState";
import { useDispatch } from "react-redux";

type FindUserByAccessCodeRequest = Pick<UserEntity, "accessCode">;

const useFindUserByAccessCode = () => {
	const { createRequest } = useFetchProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { addUser } = UserState();

	const findUserByAccessCode = async ({
		accessCode,
	}: FindUserByAccessCodeRequest) => {
		setIsLoading(true);

		const response = await createRequest({
			httpRoute: "users/access-code/:accessCode",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: { accessCode },
			httpBody: {},
		});

		const foundUser = (await response.json()) as UserEntity;
		dispatch(addUser(foundUser));

		setIsLoading(false);
	};

	return {
		findUserByAccessCode,
		isLoading,
	};
};

export { useFindUserByAccessCode };
