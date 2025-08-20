import { type Request, type Response, Router } from 'express';

import { CreateUserUseCase } from '../useCases/users/create-user';

const UserRouter = () => {
  const createUser = async (request: Request, response: Response) => {
    const { createUser } = CreateUserUseCase({ request, response });
    const { data, errors, status } = await createUser();

    return void response.status(status).json({ data, errors });
  };

  return {
    subscribe: (router: Router) => {
      router.post('/', createUser);
      return router;
    },
  };
};

export { UserRouter };
