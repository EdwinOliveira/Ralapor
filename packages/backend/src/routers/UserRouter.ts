import type { Router } from "express";

const UserRouter = () => {
	const subscribe = (router: Router): Router => {
		return router;
	};

	return { subscribe };
};

export { UserRouter };
