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
				Pick<UserEntity, "accessToken" | "refreshToken" | "updatedAt">
			>
		> => {
			const { affectedIds: foundUsersId, affectedRows: foundUsers } =
				await repository.findUserById({ query: { id } });

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
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
				headers: { location: `/users/${updatedUsersId[0]}` },
				args: {
					accessToken,
					refreshToken,
					updatedAt: updatedUsersRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateUserTokensByIdUseCase };
