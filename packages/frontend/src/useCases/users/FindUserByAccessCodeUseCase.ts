import { FetchProvider } from "../../providers/FetchProvider";
import type { UserEntity } from "../../state/UserState";

type FindUserByAccessCodeRequest = Pick<UserEntity, "accessCode">;

const FindUserByAccessCodeUseCase = () => {
	const { createRequest } = FetchProvider();

	return {
		findUserByAccessCode: async (
			params: FindUserByAccessCodeRequest,
		): Promise<UserEntity> => {
			const response = await createRequest(
				"users/access-code/:accessCode",
				"GET",
				{},
				{},
				params,
			);

			return await response.json();
		},
	};
};

export { FindUserByAccessCodeUseCase };
