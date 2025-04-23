type UseCaseResponse<T> = {
	statusCode: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500;
	args?: T;
};

type UseCaseRequest<T> = {
	schemaArgs: T;
};

export type { UseCaseResponse, UseCaseRequest };
