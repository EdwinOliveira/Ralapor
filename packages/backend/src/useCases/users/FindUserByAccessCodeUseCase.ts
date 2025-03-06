import type { Request, Response } from "express";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { findUserByAccessCodeSchema, userDTOMapper } from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { TokenProvider } from "../../providers/TokenProvider";

const FindUserByAccessCodeUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const tokenProvider = TokenProvider();

	return {
		findUserByAccessCode: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findUserByAccessCodeSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findUsers();

			for (const affectedRow of affectedRows) {
				const isSameAccessCode = await hashProvider.compare(
					schemaArgs.params.accessCode,
					affectedRow.accessCode,
				);

				if (isSameAccessCode === true) {
					const accessToken = tokenProvider.createToken(
						{
							userId: affectedRow.id,
							username: affectedRow.username,
							email: affectedRow.email,
							phoneNumber: affectedRow.phoneNumber,
						},
						"1h",
					);

					const refreshToken = tokenProvider.createToken(
						{
							userId: affectedRow.id,
							username: affectedRow.username,
							email: affectedRow.email,
							phoneNumber: affectedRow.phoneNumber,
						},
						"1d",
					);

					const [hashedAccessToken, hashedRefreshToken] = await Promise.all([
						hashProvider.hash(accessToken),
						hashProvider.hash(refreshToken),
					]);

					await repository.updateUserById({
						args: {
							accessToken: hashedAccessToken,
							refreshToken: hashedRefreshToken,
						},
					});

					return response.status(200).json({
						data: userDTOMapper(affectedRow),
						tokens: { accessToken, refreshToken },
					});
				}
			}

			return response.status(404).json();
		},
	};
};

export { FindUserByAccessCodeUseCase };
