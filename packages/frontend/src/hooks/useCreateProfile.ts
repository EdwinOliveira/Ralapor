import { useState } from "react";
import { ProfileState, type ProfileEntity } from "../state/ProfileState";
import { useDispatch } from "react-redux";
import { useFetchProvider } from "../providers/useFetchProvider";

type CreateProfileRequest = Pick<
	ProfileEntity,
	"userId" | "firstName" | "lastName" | "dateBirth"
>;

const useCreateProfile = () => {
	const { createRequest } = useFetchProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { addProfile } = ProfileState();

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
