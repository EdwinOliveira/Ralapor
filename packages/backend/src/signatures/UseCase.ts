import type { Context } from "./Context";

type UseCaseResponse<T> = {
	statusCode: number;
	args?: T;
};

type UseCaseRequest<T> = {
	context: Context;
	schemaArgs: T;
};

export type { UseCaseResponse, UseCaseRequest };
