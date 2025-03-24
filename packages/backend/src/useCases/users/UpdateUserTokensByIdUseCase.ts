import type {
	UpdateUserTokensByIdRequest,
	UserEntity,
} from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { HashProvider } from "../../providers/HashProvider";
import { TokenProvider } from "../../providers/TokenProvider";
import type { UseCaseRequest, UseCaseResponse } from "../../types/UseCase";

const UpdateUserTokensByIdUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();
	const tokenProvider = TokenProvider();

	return {
		updateUserTokensById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<UpdateUserTokensByIdRequest>): Promise<
			UseCaseResponse<
				Pick<UserEntity, "id" | "accessToken" | "refreshToken" | "updatedAt">
			>
		> => {
			const { affectedIds: foundUsersId, affectedRows: foundUsersRow } =
				await repository.findUserById({ query: { id } });

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const tokenPayload = {
				userId: foundUsersRow[0].id,
				username: foundUsersRow[0].username,
				email: foundUsersRow[0].email,
				phoneNumber: foundUsersRow[0].phoneNumber,
			};

			const accessToken = tokenProvider.createToken(tokenPayload, "1h");
			const refreshToken = tokenProvider.createToken(tokenPayload, "1d");

			const [hashedAccessToken, hashedRefreshToken] = await Promise.all([
				hashProvider.hash(accessToken),
				hashProvider.hash(refreshToken),
			]);

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await repository.updateUserById({
					args: {
						accessToken: hashedAccessToken,
						refreshToken: hashedRefreshToken,
					},
				});

			if (updatedUsersId.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedUsersId[0],
					accessToken,
					refreshToken,
					updatedAt: updatedUsersRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateUserTokensByIdUseCase };
