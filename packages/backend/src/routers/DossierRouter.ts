import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindDossierByIdUseCase } from "../useCases/dossiers/FindDossierByIdUseCase";
import { CreateDossierUseCase } from "../useCases/dossiers/CreateDossierUseCase";
import { UpdateDossierByIdUseCase } from "../useCases/dossiers/UpdateDossierByIdUseCase";
import { FindDossierByUserIdUseCase } from "../useCases/dossiers/FindDossierByUserIdUseCase";

const DossierRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findDossierById } = FindDossierByIdUseCase();
				await findDossierById(request, response);
			},
		);

		router.get(
			"/user/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findDossierByUserId } = FindDossierByUserIdUseCase();
				await findDossierByUserId(request, response);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { createDossier } = CreateDossierUseCase();
				await createDossier(request, response);
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { updateDossierById } = UpdateDossierByIdUseCase();
				await updateDossierById(request, response);
			},
		);

		return router;
	};

	return { subscribe };
};

export { DossierRouter };
