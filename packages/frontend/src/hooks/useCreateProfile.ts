import { useState } from "react";
import { FetchProvider } from "../providers/fetchProvider";
import { ProfileState, type ProfileEntity } from "../state/profileState";
import { useDispatch } from "react-redux";

type CreateProfileRequest = Pick<
	ProfileEntity,
	"userId" | "firstName" | "lastName" | "dateBirth"
>;

const useCreateProfile = () => {
	const { createRequest } = FetchProvider();
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

		const data = await createRequest({
			httpRoute: "profiles",
			httpMethod: "POST",
			httpQueries: {},
			httpParams: {},
			httpBody: { userId, firstName, lastName, dateBirth },
		});

		const createdProfile = (await data.json()) as ProfileEntity;
		dispatch(addProfile(createdProfile));

		setIsLoading(false);
	};

	return {
		createProfile,
		isLoading,
	};
};

export { useCreateProfile };
