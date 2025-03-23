import type { ZodIssue } from "zod";

type UseCaseResponse<T> = {
	statusCode: number;
	args?: T;
	headers?: {
		location: string;
	};
};

type UseCaseRequest<T> = {
	schemaArgs: T;
};

export type { UseCaseResponse, UseCaseRequest };
