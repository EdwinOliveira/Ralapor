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
    if (httpQueries !== undefined) {
      for (const httpQuery of Object.entries(httpQueries)) {
        httpRoute = httpRoute.includes("?")
          ? `${httpRoute}&${httpQuery[0]}=${httpQuery[1]}`
          : `${httpRoute}?${httpQuery[0]}=${httpQuery[1]}`;
      }
    }

    if (httpParams !== undefined) {
      for (const httpParam of Object.entries(httpParams)) {
        httpRoute = httpRoute.replace(`:${httpParam[0]}`, String(httpParam[1]));
      }
    }

    return fetch(`http://localhost:8000${httpRoute}`, {
      method: httpMethod,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: httpMethod !== "GET" ? JSON.stringify(httpBody) : undefined,
    });
  };

  return { createRequest };
};

export { useFetch };
