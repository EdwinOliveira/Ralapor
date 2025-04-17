import { useDispatch } from "react-redux";
import { useFetchProvider } from "../providers/useFetchProvider";
import { addCategories, type CategoryEntity } from "../state/useCategoryState";

const useFindCategories = () => {
	const dispatch = useDispatch();
	const { createRequest } = useFetchProvider();

	const findCategories = async () => {
		const response = await createRequest({
			httpRoute: "categories",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: {},
			httpBody: {},
		});

		const foundCategories = (await response.json()) as CategoryEntity;
		const action = addCategories(foundCategories);
		dispatch(action);
	};

	return { findCategories };
};

export { useFindCategories };
