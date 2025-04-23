import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type {
	UpdateUserAccessCodeByIdRequest,
	UserEntity,
} from "../../domains/User";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type { Context } from "../../signatures/Context";

const UpdateUserAccessCodeByIdUseCase = (context: Context) => {
	const repository = UserRemoteRepository(context);

	return {
		updateUserAccessCodeById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<UpdateUserAccessCodeByIdRequest>): Promise<
			UseCaseResponse<Pick<UserEntity, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundUsersId } = await repository.findUserById({
				query: { id },
			});

			if (foundUsersId.length === 0) {
				return { statusCode: 404 };
			}

			const {
				providers: { randomProvider, hashProvider, sessionProvider },
				services: { cacheService },
			} = context;

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: updatedUsersId, affectedRows: updatedUsersRow } =
				await repository.updateUserById({
					query: { id },
					args: { accessCode: hashedAccessCode },
				});

			if (updatedUsersId.length === 0) {
				return { statusCode: 500 };
			}

			console.log(accessCode);

			const cookie = sessionProvider.getSession();
			if (cookie.sid === undefined) {
				return { statusCode: 500 };
			}

			await cacheService.updateOnCache(`session:${cookie.sid}`, {
				sessionId: cookie.sid,
				userId: updatedUsersId[0],
				roleId: updatedUsersRow[0].roleId,
				expiresIn: new Date().setSeconds(randomProvider.createExpirationTime()),
			});

			return {
				statusCode: 201,
				args: {
					id: updatedUsersId[0],
					updatedAt: updatedUsersRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateUserAccessCodeByIdUseCase };
