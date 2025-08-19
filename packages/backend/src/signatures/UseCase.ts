import { type Request, type Response } from 'express';

type UseCaseRequest = {
  request: Request;
  response: Response;
};

type UseCaseResponse<T = unknown, K = unknown> = {
  data?: T;
  errors?: K;
  status: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 409 | 500 | 501;
};

export { UseCaseRequest, UseCaseResponse };
