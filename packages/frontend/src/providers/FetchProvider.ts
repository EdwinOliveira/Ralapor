type FetchProvidersArgs = {
	httpRoute: string;
	httpMethod: "GET" | "POST" | "PUT" | "DELETE";
	httpQueries: Record<string, string>;
	httpParams: Record<string, string>;
	httpBody: Record<string, unknown>;
};

const FetchProvider = () => {
	const createRequest = ({
		httpRoute,
		httpMethod,
		httpQueries,
		httpParams,
		httpBody,
	}: FetchProvidersArgs) => {
		let buildedURL = `http://localhost:8000/${httpRoute}`;

		for (const httpQuery of Object.entries(httpQueries)) {
			buildedURL = buildedURL.includes("?")
				? `${buildedURL}&${httpQuery[0]}=${httpQuery[1]}`
				: `${buildedURL}?${httpQuery[0]}=${httpQuery[1]}`;
		}

		for (const httpParam of Object.entries(httpParams)) {
			buildedURL = buildedURL.replace(`:${httpParam[0]}`, httpParam[1]);
		}

		return fetch(buildedURL, {
			method: httpMethod,
			headers: { "Content-Type": "application/json" },
			body: httpMethod !== "GET" ? JSON.stringify(httpBody) : undefined,
		});
	};

	return { createRequest };
};

export { FetchProvider };
