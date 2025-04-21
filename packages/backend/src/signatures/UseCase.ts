import type { HttpContext } from "./HttpContext";

type UseCaseResponse<T> = {
	statusCode: number;
	args?: T;
};

type UseCaseRequest<T> = {
	httpContext: HttpContext;
	schemaArgs: T;
};

export type { UseCaseResponse, UseCaseRequest };
