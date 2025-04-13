import { useState } from "react";
import { useFetchProvider } from "../providers/useFetchProvider";

const useFindUserSession = () => {
	const { createRequest } = useFetchProvider();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const findUserSession = async () => {
		setIsLoading(true);

		await createRequest({
			httpRoute: "users/session",
			httpMethod: "GET",
			httpQueries: {},
			httpParams: {},
			httpBody: {},
		});

		setIsLoading(false);
	};

	return {
		findUserSession,
		isLoading,
	};
};

export { useFindUserSession };
