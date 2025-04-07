import { FetchProvider } from "../../providers/FetchProvider";
import type { ProfileEntity } from "../../state/ProfileState";

type FindProfileByIdRequest = Pick<ProfileEntity, "id">;

const FindProfileByIdUseCase = () => {
	const { createRequest } = FetchProvider();

	return {
		findProfileById: async (params: FindProfileByIdRequest) => {
			const response = await createRequest(
				"profiles/:id",
				"GET",
				{},
				{},
				params,
			);

			return (await response.json()) satisfies ProfileEntity;
		},
	};
};

export { FindProfileByIdUseCase };
