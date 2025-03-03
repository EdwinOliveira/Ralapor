import type { Router } from "express";
import { UserRouter } from "./routers/UserRouter";

const BackendRouter = () => {
	const subscribe = (router: Router): Router => {
		router.use("/users", UserRouter().subscribe(router));

		return router;
	};

	return { subscribe };
};

export { BackendRouter };
