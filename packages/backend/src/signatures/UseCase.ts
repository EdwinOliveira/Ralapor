type UseCaseResponse<T> = {
  args?: T;
  statusCode: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500;
};

type UseCaseRequest<T> = {
  schemaArgs: T;
};

export type { UseCaseRequest, UseCaseResponse };
