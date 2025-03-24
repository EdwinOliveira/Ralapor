import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindDossierByIdUseCase } from "../useCases/dossiers/FindDossierByIdUseCase";
import { CreateDossierUseCase } from "../useCases/dossiers/CreateDossierUseCase";
import { UpdateDossierByIdUseCase } from "../useCases/dossiers/UpdateDossierByIdUseCase";
import { FindDossiersByUserIdUseCase } from "../useCases/dossiers/FindDossiersByUserIdUseCase";
import { FindDossiersByCategoryIdUseCase } from "../useCases/dossiers/FindDossiersByCategoryIdUseCase";

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
				const { findDossiersByUserId } = FindDossiersByUserIdUseCase();
				await findDossiersByUserId(request, response);
			},
		);

		router.get(
			"/category/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findDossiersByCategoryId } = FindDossiersByCategoryIdUseCase();
				await findDossiersByCategoryId(request, response);
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
