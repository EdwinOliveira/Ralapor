import { useFetchProvider } from "../providers/useFetchProvider";
import type { UserEntity } from "../state/useUserState";

type FindUserByIdRequest = Pick<UserEntity, "id">;

const useFindUserById = () => {
	const { createRequest } = useFetchProvider();

	const findUserById = async ({ id }: FindUserByIdRequest) => {
		const response = await createRequest({
			httpRoute: "users/:id",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: { id },
			httpBody: {},
		});

		return (await response.json()) as UserEntity | undefined;
	};

	return { findUserById };
};

export { useFindUserById };
