type UseCaseResponse<T> = {
	statusCode: number;
	args?: T;
};

type UseCaseRequest<T> = {
	schemaArgs: T;
};

export type { UseCaseResponse, UseCaseRequest };
