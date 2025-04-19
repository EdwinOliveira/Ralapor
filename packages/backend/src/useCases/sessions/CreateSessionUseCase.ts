import type { CreateSessionRequest, SessionDTO } from "../../domains/Session";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import { SessionRemoteRepository } from "../../repositories/SessionRemoteRepository";

const CreateSessionUseCase = () => {
	const repository = SessionRemoteRepository();

	return {
		createSession: async ({
			schemaArgs: {
				body: { userId, roleId, expiresIn },
			},
		}: UseCaseRequest<CreateSessionRequest>): Promise<
			UseCaseResponse<Pick<SessionDTO, "id">>
		> => {
			const { affectedIds: foundSessionsId } =
				await repository.findSessionByUserIdAndRoleId({
					query: { userId, roleId },
				});

			if (foundSessionsId.length !== 0) {
				return { statusCode: 409 };
			}

			const { affectedIds: createdSessionsId } = await repository.createSession(
				{ args: { userId, roleId, expiresIn, isExpired: false } },
			);

			if (createdSessionsId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdSessionsId[0] },
			};
		},
	};
};

export { CreateSessionUseCase };
