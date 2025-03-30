const FetchProvider = () => {
	const createRequest = (
		httpRoute: string,
		httpMethod: "GET" | "POST" | "PUT" | "DELETE",
		httpBody: Record<string, unknown>,
		httpQueries: Record<string, unknown> = {},
		httpParams: Record<string, unknown> = {},
	) => {
		let buildedURL = `http://localhost:8000/${httpRoute}`;

		for (const httpParam of Object.entries(httpParams)) {
			buildedURL = buildedURL.replace(`:${httpParam[0]}`, String(httpParam[1]));
		}

		for (const httpQuery of Object.entries(httpQueries)) {
			buildedURL = buildedURL.includes("?")
				? `${buildedURL}&${httpQuery[0]}=${httpQuery[1]}`
				: `${buildedURL}?${httpQuery[0]}=${httpQuery[1]}`;
		}

		return fetch(buildedURL, {
			method: httpMethod,
			body: JSON.stringify(httpBody),
		});
	};

	return { createRequest };
};

export { FetchProvider };
