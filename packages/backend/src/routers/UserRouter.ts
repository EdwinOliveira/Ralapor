import type { Request, Response, Router } from "express";
import { FindUserByIdUseCase } from "../useCases/users/FindUserByIdUseCase";
import { FindUserByAccessCodeUseCase } from "../useCases/users/FindUserByAccessCodeUseCase";
import { CreateUserUseCase } from "../useCases/users/CreateUserUseCase";
import { UpdateUserByIdUseCase } from "../useCases/users/UpdateUserByIdUseCase";
import { UpdateUserAccessCodeByIdUseCase } from "../useCases/users/UpdateUserAccessCodeByIdUseCase";
import { UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase } from "../useCases/users/UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase";
import { UpdateUserTokensByIdUseCase } from "../useCases/users/UpdateUserTokensByIdUseCase";

const UserRouter = () => {
	const subscribe = (router: Router): Router => {
		router.get("/:id", async (request: Request, response: Response) => {
			const { findUserById } = FindUserByIdUseCase();
			await findUserById(request, response);
		});

		router.get(
			"/access-code/:accessCode",
			async (request: Request, response: Response) => {
				const { findUserByAccessCode } = FindUserByAccessCodeUseCase();
				await findUserByAccessCode(request, response);
			},
		);

		router.post("/", async (request: Request, response: Response) => {
			const { createUser } = CreateUserUseCase();
			await createUser(request, response);
		});

		router.put("/:id", async (request: Request, response: Response) => {
			const { updateUserById } = UpdateUserByIdUseCase();
			await updateUserById(request, response);
		});

		router.put(
			"/access-code/:id",
			async (request: Request, response: Response) => {
				const { updateUserAccessCodeById } = UpdateUserAccessCodeByIdUseCase();
				await updateUserAccessCodeById(request, response);
			},
		);

		router.put(
			"/access-code/:username/:email/:phoneNumber",
			async (request: Request, response: Response) => {
				const { updateUserAccessCodeByUsernameOrEmailOrPhoneNumber } =
					UpdateUserAccessCodeByUsernameOrEmailOrPhoneNumberUseCase();

				await updateUserAccessCodeByUsernameOrEmailOrPhoneNumber(
					request,
					response,
				);
			},
		);

		router.put("/:id/tokens", async (request: Request, response: Response) => {
			const { updateUserTokensById } = UpdateUserTokensByIdUseCase();
			await updateUserTokensById(request, response);
		});

		return router;
	};

	return { subscribe };
};

export { UserRouter };
