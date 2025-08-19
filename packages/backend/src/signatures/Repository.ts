type RepositoryRequest<T = unknown, K = unknown> = {
  queryArgs?: K;
  queryParams?: T;
};
type RepositoryResponse<T = unknown> = {
  affectedIds: Array<number>;
  affectedRows: Array<T>;
};

export { type RepositoryRequest, type RepositoryResponse };
