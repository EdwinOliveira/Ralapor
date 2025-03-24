import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import {
	type FindUserByAccessCodeRequest,
	type UserDTO,
	userDTOMapper,
} from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import { TokenProvider } from "../../providers/TokenProvider";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const FindUserByAccessCodeUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const tokenProvider = TokenProvider();

	return {
		findUserByAccessCode: async ({
			schemaArgs: {
				params: { accessCode },
			},
		}: UseCaseRequest<FindUserByAccessCodeRequest>): Promise<
			UseCaseResponse<UserDTO>
		> => {
			const { affectedRows } = await repository.findUsers();

			for (const affectedRow of affectedRows) {
				const isSameAccessCode = await hashProvider.compare(
					accessCode,
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

					return {
						statusCode: 200,
						args: { ...userDTOMapper(affectedRow), accessToken, refreshToken },
					};
				}
			}

			return { statusCode: 404 };
		},
	};
};

export { FindUserByAccessCodeUseCase };
