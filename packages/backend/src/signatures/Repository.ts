type RepositoryRequest<T = unknown, K = unknown> = {
  args?: K;
  query?: T;
};

type RepositoryResponse<T> = {
  affectedIds: Array<number>;
  affectedRows: Array<T>;
};

export type { RepositoryRequest, RepositoryResponse };
