import { Router } from 'express';

const UserRouter = () => {
  return {
    subscribe: (router: Router) => {
      return router;
    },
  };
};

export { UserRouter };
