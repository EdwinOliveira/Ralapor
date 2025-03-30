import { FetchProvider } from "../../providers/FetchProvider";
import type { UserEntity } from "../../state/UserState";

type CreateUserRequest = Pick<UserEntity, "username" | "email" | "phoneNumber">;

const CreateUserUseCase = () => {
	return {
		createUser: async (args: CreateUserRequest) => {
			const { createRequest } = FetchProvider();
			return await createRequest("/users", "POST", args);
		},
	};
};

export { CreateUserUseCase };
