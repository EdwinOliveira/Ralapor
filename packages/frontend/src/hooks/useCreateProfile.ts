import { useState } from "react";
import { useProfileState, type ProfileEntity } from "../state/useProfileState";
import { useDispatch } from "react-redux";
import { useFetchProvider } from "../providers/useFetchProvider";

type CreateProfileRequest = Pick<
	ProfileEntity,
	"userId" | "firstName" | "lastName" | "dateBirth"
>;

const useCreateProfile = () => {
	const { createRequest } = useFetchProvider();
	const { addProfile } = useProfileState();
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const createProfile = async ({
		userId,
		firstName,
		lastName,
		dateBirth,
	}: CreateProfileRequest) => {
		setIsLoading(true);

		const response = await createRequest({
			httpRoute: "profiles",
			httpMethod: "POST",
			httpQueries: {},
			httpParams: {},
			httpBody: { userId, firstName, lastName, dateBirth },
		});

		const createdProfile = (await response.json()) as ProfileEntity;
		dispatch(addProfile(createdProfile));

		setIsLoading(false);
	};

	return {
		createProfile,
		isLoading,
	};
};

export { useCreateProfile };
