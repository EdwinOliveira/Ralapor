type TransactionRequest<K = unknown> = {
	args: K;
};

type TransactionResponse<T> = {
	affectedIds: Array<number>;
	affectedRows: Array<T>;
};

export type { TransactionRequest, TransactionResponse };
