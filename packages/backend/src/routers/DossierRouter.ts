import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";

const DossierRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { findProfileById } = FindProfileByIdUseCase();
				await findProfileById(request, response);
			},
		);

		router.post(
			"/",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { createProfile } = CreateProfileUseCase();
				await createProfile(request, response);
			},
		);

		router.put(
			"/:id",
			AccessTokenGuard,
			async (request: Request, response: Response) => {
				const { updateProfileById } = UpdateProfileByIdUseCase();
				await updateProfileById(request, response);
			},
		);

		return router;
	};

	return { subscribe };
};

export { DossierRouter };
