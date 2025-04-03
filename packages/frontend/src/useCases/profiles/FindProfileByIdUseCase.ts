import { FetchProvider } from "../../providers/FetchProvider";
import type { ProfileEntity } from "../../state/ProfileState";

type FindProfileByIdRequest = Pick<ProfileEntity, "id">;

const FindProfileByIdUseCase = () => {
	const { createRequest } = FetchProvider();

	return {
		findProfileById: async (
			params: FindProfileByIdRequest,
		): Promise<ProfileEntity> => {
			const response = await createRequest(
				"profiles/:id",
				"GET",
				{},
				{},
				params,
			);

			return await response.json();
		},
	};
};

export { FindProfileByIdUseCase };
