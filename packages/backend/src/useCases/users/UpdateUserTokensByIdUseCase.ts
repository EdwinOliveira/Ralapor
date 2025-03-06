import type { Request, Response } from "express";
import { updateUserTokensByIdSchema } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { HashProvider } from "../../providers/HashProvider";
import { TokenProvider } from "../../providers/TokenProvider";

const UpdateUserTokensByIdUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const tokenProvider = TokenProvider();

	return {
		updateUserTokensById: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				updateUserTokensByIdSchema.safeParse({ body: request.body });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedIds: foundUsersId, affectedRows: foundUsers } =
				await repository.findUserById({
					query: { id: schemaArgs.params.id },
				});

			if (foundUsersId.length === 0) {
				return response.status(404).json();
			}

			const accessToken = tokenProvider.createToken(
				{
					userId: foundUsers[0].id,
					username: foundUsers[0].username,
					email: foundUsers[0].email,
					phoneNumber: foundUsers[0].phoneNumber,
				},
				"1h",
			);

			const refreshToken = tokenProvider.createToken(
				{
					userId: foundUsers[0].id,
					username: foundUsers[0].username,
					email: foundUsers[0].email,
					phoneNumber: foundUsers[0].phoneNumber,
				},
				"1d",
			);

			const [hashedAccessToken, hashedRefreshToken] = await Promise.all([
				hashProvider.hash(accessToken),
				hashProvider.hash(refreshToken),
			]);

			const { affectedIds: updatedUsersId } = await repository.updateUserById({
				args: {
					accessToken: hashedAccessToken,
					refreshToken: hashedRefreshToken,
				},
			});

			if (updatedUsersId.length === 0) {
				return response.status(404).json();
			}

			return response
				.status(201)
				.location(`/users/${updatedUsersId[0]}`)
				.json({ data: { accessToken, refreshToken } });
		},
	};
};

export { UpdateUserTokensByIdUseCase };
