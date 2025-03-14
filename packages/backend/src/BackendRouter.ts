import type { Router } from "express";
import { UserRouter } from "./routers/UserRouter";
import { ProfileRouter } from "./routers/ProfileRouter";
import { DossierRouter } from "./routers/DossierRouter";
import { BookRouter } from "./routers/BookRouter";
import { ChapterRouter } from "./routers/ChapterRouter";
import { PageRouter } from "./routers/PageRouter";

const BackendRouter = () => {
	const subscribe = (router: Router): Router => {
		router.use("/users", UserRouter().subscribe(router));
		router.use("/profiles", ProfileRouter().subscribe(router));
		router.use("/dossiers", DossierRouter().subscribe(router));
		router.use("/books", BookRouter().subscribe(router));
		router.use("/chapters", ChapterRouter().subscribe(router));
		router.use("/pages", PageRouter().subscribe(router));

		return router;
	};

	return { subscribe };
};

export { BackendRouter };
