import { addProfile, type ProfileEntity } from "../state/useProfileState";
import { useDispatch } from "react-redux";
import { useFetchProvider } from "../providers/useFetchProvider";

type CreateProfileRequest = Pick<
	ProfileEntity,
	"userId" | "firstName" | "lastName" | "dateBirth"
>;

const useCreateProfile = () => {
	const dispatch = useDispatch();
	const { createRequest } = useFetchProvider();

	const createProfile = async ({
		userId,
		firstName,
		lastName,
		dateBirth,
	}: CreateProfileRequest) => {
		const response = await createRequest({
			httpRoute: "profiles",
			httpMethod: "POST",
			httpQueries: {},
			httpParams: {},
			httpBody: { userId, firstName, lastName, dateBirth },
		});

		const createdProfile = (await response.json()) as ProfileEntity;
		dispatch(addProfile(createdProfile));
	};

	return { createProfile };
};

export { useCreateProfile };
