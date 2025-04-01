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
			const { affectedRows: foundUsersRow } = await repository.findUsers();

			for (const foundUserRow of foundUsersRow) {
				const isSameAccessCode = await hashProvider.compare(
					accessCode,
					foundUserRow.accessCode,
				);

				if (isSameAccessCode === true) {
					const tokenPayload = {
						userId: foundUserRow.id,
						username: foundUserRow.username,
						email: foundUserRow.email,
						phoneNumber: foundUserRow.phoneNumber,
					};

					const accessToken = tokenProvider.createToken(tokenPayload, "1h");
					const refreshToken = tokenProvider.createToken(tokenPayload, "1d");

					const [hashedAccessToken, hashedRefreshToken] = await Promise.all([
						hashProvider.hash(accessToken),
						hashProvider.hash(refreshToken),
					]);

					const { affectedRows: updatedUsersRow } =
						await repository.updateUserById({
							query: { id: foundUserRow.id },
							args: {
								accessToken: hashedAccessToken,
								refreshToken: hashedRefreshToken,
							},
						});

					return {
						statusCode: 200,
						args: {
							...userDTOMapper(foundUserRow),
							accessToken,
							refreshToken,
							updatedAt: updatedUsersRow[0].updatedAt,
						},
					};
				}
			}

			return { statusCode: 404 };
		},
	};
};

export { FindUserByAccessCodeUseCase };
