import { FetchProvider } from "../../providers/FetchProvider";
import type { UserEntity } from "../../state/UserState";

type CreateUserRequest = Pick<
	UserEntity,
	"username" | "email" | "phoneNumber" | "phoneNumberCode"
>;

const CreateUserUseCase = () => {
	const { createRequest } = FetchProvider();

	return {
		createUser: async (args: CreateUserRequest) => {
			const response = await createRequest("users", "POST", args);
			await response.json();
		},
	};
};

export { CreateUserUseCase };
