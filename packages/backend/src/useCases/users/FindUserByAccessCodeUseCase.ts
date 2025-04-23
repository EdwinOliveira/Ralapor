import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import {
	type FindUserByAccessCodeRequest,
	type UserDTO,
	userDTOMapper,
} from "../../domains/User";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type { Context } from "../../signatures/Context";

const FindUserByAccessCodeUseCase = (context: Context) => {
	const repository = UserRemoteRepository(context.services.databaseService);

	return {
		findUserByAccessCode: async ({
			schemaArgs: {
				params: { accessCode },
			},
		}: UseCaseRequest<FindUserByAccessCodeRequest>): Promise<
			UseCaseResponse<UserDTO>
		> => {
			const {
				providers: { sessionProvider, randomProvider, hashProvider },
				services: { cacheService },
			} = context;

			const { affectedRows: foundUsersRow } = await repository.findUsers();

			for (const foundUserRow of foundUsersRow) {
				const isSameAccessCode = await hashProvider.compare(
					accessCode,
					foundUserRow.accessCode,
				);

				if (isSameAccessCode === true) {
					const sessionId = randomProvider.createRandomUuid();
					sessionProvider.addToSession(sessionId);

					await cacheService.addToCache(`session:${sessionId}`, {
						sessionId: sessionId,
						userId: foundUserRow.id,
						roleId: foundUserRow.roleId,
						expiresIn: new Date().setSeconds(
							randomProvider.createExpirationTime(),
						),
					});

					return {
						statusCode: 200,
						args: userDTOMapper(foundUserRow),
					};
				}
			}

			return { statusCode: 404 };
		},
	};
};

export { FindUserByAccessCodeUseCase };
