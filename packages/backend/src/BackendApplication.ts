import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express, { json, Router } from 'express';
import 'dotenv/config';

import { DatabaseDataSource } from './dataSource/DatabaseDataSource';
import { RoleRouter } from './routers/RoleRouter';
import { UserRouter } from './routers/UserRouter';

const BackendApplication = () => {
  const httpApplication = Express();
  const httpAddress = Number.parseInt(process.env.SERVER_PORT ?? '8000');

  const createMiddleware = () => {
    httpApplication.use(json());
    httpApplication.use(cookieParser());
    httpApplication.use(
      cors({
        credentials: true,
        origin: 'http://localhost:5173',
      })
    );
  };

  const createRoutes = async () => {
    const userRouter = UserRouter().subscribe(Router());
    httpApplication.use('/users', userRouter);

    const roleRouter = RoleRouter().subscribe(Router());
    httpApplication.use('/roles', roleRouter);
  };

  const createListner = () => {
    httpApplication.listen(httpAddress, async () => {
      const {
        createConnection,
        createRolesTable,
        createUsersTable,
        destroyConnection,
      } = DatabaseDataSource();

      const connection = createConnection();

      try {
        await createUsersTable(connection);
        await createRolesTable(connection);
      } finally {
        await destroyConnection(connection);
      }

      console.log(`Server initialized on PORT:${httpAddress}!`);
    });
  };

  return {
    createListner,
    createMiddleware,
    createRoutes,
  };
};

const { createListner, createMiddleware, createRoutes } = BackendApplication();

createMiddleware();
createRoutes();
createListner();
