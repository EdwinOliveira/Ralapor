import Express, { json, Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { UserRouter } from "./routers/UserRouter";
import { RoleRouter } from "./routers/RoleRouter";
import { DatabaseDataSource } from "./dataSource/DatabaseDataSource";

const BackendApplication = () => {
  const httpApplication = Express();
  const httpAddress = Number.parseInt(process.env.SERVER_PORT ?? "8000");

  const createMiddleware = () => {
    httpApplication.use(json());
    httpApplication.use(cookieParser());
    httpApplication.use(
      cors({
        origin: "http://localhost:5173",
        credentials: true,
      })
    );
  };

  const createRoutes = async () => {
    const userRouter = UserRouter().subscribe(Router());
    httpApplication.use("/users", userRouter);

    const roleRouter = RoleRouter().subscribe(Router());
    httpApplication.use("/roles", roleRouter);
  };

  const createListner = () => {
    httpApplication.listen(httpAddress, async () => {
      const {
        createConnection,
        createUsersTable,
        createRolesTable,
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
    createMiddleware,
    createRoutes,
    createListner,
  };
};

const { createMiddleware, createRoutes, createListner } = BackendApplication();

createMiddleware();
createRoutes();
createListner();
