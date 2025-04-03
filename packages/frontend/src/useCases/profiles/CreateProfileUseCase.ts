import { FetchProvider } from "../../providers/FetchProvider";
import type { ProfileEntity } from "../../state/ProfileState";

type CreateProfileRequest = Pick<
	ProfileEntity,
	"userId" | "firstName" | "lastName" | "dateBirth"
>;

const CreateProfileUseCase = () => {
	const { createRequest } = FetchProvider();

	return {
		createProfile: async (args: CreateProfileRequest) => {
			const response = await createRequest("profiles", "POST", args);
			await response.json();
		},
	};
};

export { CreateProfileUseCase };
