import { useState } from "react";
import { useFetchProvider } from "../providers/useFetchProvider";
import { useUserState, type UserEntity } from "../state/useUserState";
import { useDispatch } from "react-redux";

type FindUserByAccessCodeRequest = Pick<UserEntity, "accessCode">;

const useFindUserByAccessCode = () => {
	const { createRequest } = useFetchProvider();
	const dispatch = useDispatch();
	const { addUser } = useUserState();
	const [isLoading, setIsLoading] = useState<boolean>(false);

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
