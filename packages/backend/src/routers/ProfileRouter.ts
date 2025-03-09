import type { Request, Response, Router } from "express";
import { AccessTokenGuard } from "../guards/AccessTokenGuard";
import { FindProfileByIdUseCase } from "../useCases/profiles/FindProfileByIdUseCase";
import { CreateProfileUseCase } from "../useCases/profiles/CreateProfileUseCase";
import { UpdateProfileByIdUseCase } from "../useCases/profiles/UpdateProfileByIdUseCase";

const ProfileRouter = () => {
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

export { ProfileRouter };
