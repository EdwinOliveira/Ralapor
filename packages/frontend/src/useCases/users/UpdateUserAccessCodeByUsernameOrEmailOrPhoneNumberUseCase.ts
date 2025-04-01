import { FetchProvider } from "../../providers/FetchProvider";
import type { UserEntity } from "../../state/UserState";

type UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest = Pick<
	UserEntity,
	"username" | "email" | "phoneNumber"
>;

const UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase = () => {
	const { createRequest } = FetchProvider();

	return {
		updateUserAccessCodeByUsernameOrEmailOrPhoneNumber: async (
			params: UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberRequest,
		) => {
			const response = await createRequest(
				"users/access-code/:username/:email/:phoneNumber",
				"PUT",
				{},
				{},
				params,
			);

			return await response.json();
		},
	};
};

export { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase };
