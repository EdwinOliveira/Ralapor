import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express, { json, Router } from 'express';
import 'dotenv/config';

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
    httpApplication.use('/users', UserRouter().subscribe(Router()));
  };

  const createListner = () => {
    httpApplication.listen(httpAddress, async () => {
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
