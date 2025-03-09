import type { Router } from "express";
import { UserRouter } from "./routers/UserRouter";
import { ProfileRouter } from "./routers/ProfileRouter";

const BackendRouter = () => {
	const subscribe = (router: Router): Router => {
		router.use("/users", UserRouter().subscribe(router));
		router.use("/profiles", ProfileRouter().subscribe(router));

		return router;
	};

	return { subscribe };
};

export { BackendRouter };
