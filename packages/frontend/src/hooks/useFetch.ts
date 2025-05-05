type CreateRequestProps = {
	httpRoute: string;
	httpMethod: "GET" | "POST" | "PUT" | "DELETE";
	httpQueries?: Record<string, unknown>;
	httpParams?: Record<string, unknown>;
	httpBody?: Record<string, unknown>;
};

const useFetch = () => {
	const createRequest = ({
		httpRoute,
		httpMethod,
		httpQueries,
		httpParams,
		httpBody,
	}: CreateRequestProps) => {
		let buildedURL = `http://localhost:8000/${httpRoute}`;

		if (httpQueries !== undefined) {
			for (const httpQuery of Object.entries(httpQueries)) {
				buildedURL = buildedURL.includes("?")
					? `${buildedURL}&${httpQuery[0]}=${httpQuery[1]}`
					: `${buildedURL}?${httpQuery[0]}=${httpQuery[1]}`;
			}
		}

		if (httpParams !== undefined) {
			for (const httpParam of Object.entries(httpParams)) {
				buildedURL = buildedURL.replace(
					`:${httpParam[0]}`,
					String(httpParam[1]),
				);
			}
		}

		return fetch(buildedURL, {
			method: httpMethod,
			credentials: "include",
			headers: { "Content-Type": "application/json" },
			body: httpMethod !== "GET" ? JSON.stringify(httpBody) : undefined,
		});
	};

	return { createRequest };
};

export { useFetch };
