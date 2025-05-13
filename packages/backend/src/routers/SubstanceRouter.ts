import type { Request, Response, Router } from "express";
import { SessionGuard } from "../guards/SessionGuard";

const SubstanceRouter = () => {
	const { isAuthenticated } = SessionGuard();

	const subscribe = (router: Router): Router => {
		return router;
	};

	return { subscribe };
};

export { SubstanceRouter };
