type RepositoryRequest<T = unknown, K = unknown> = {
	query?: T;
	args?: K;
};

type RepositoryResponse<T> = {
	affectedIds: Array<number>;
	affectedRows: Array<T>;
};

export type { RepositoryRequest, RepositoryResponse };
