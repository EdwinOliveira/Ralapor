import { useState } from "react";
import { FetchProvider } from "../providers/fetchProvider";
import { UserState, type UserEntity } from "../state/UserState";
import { useDispatch } from "react-redux";

type FindUserByAccessCodeRequest = Pick<UserEntity, "accessCode">;

const useFindUserByAccessCode = () => {
	const { createRequest } = FetchProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { addUser } = UserState();

	const findUserByAccessCode = async ({
		accessCode,
	}: FindUserByAccessCodeRequest) => {
		setIsLoading(true);

		const data = await createRequest({
			httpRoute: "users/access-code/:accessCode",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: { accessCode },
			httpBody: {},
		});

		const foundUser = (await data.json()) as UserEntity;
		dispatch(addUser(foundUser));

		setIsLoading(false);
	};

	return {
		findUserByAccessCode,
		isLoading,
	};
};

export { useFindUserByAccessCode };
