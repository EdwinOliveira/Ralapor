import type { CreateSessionRequest, SessionDTO } from "../../domains/Session";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import { SessionRemoteRepository } from "../../repositories/SessionRemoteRepository";
import { FindUserByIdUseCase } from "../users/FindUserByIdUseCase";
import { FindRoleByIdUseCase } from "../roles/FindRoleByIdUseCase";

const CreateSessionUseCase = () => {
	return {
		createSession: async ({
			schemaArgs: {
				body: { userId, roleId },
			},
			context,
		}: UseCaseRequest<CreateSessionRequest>): Promise<
			UseCaseResponse<Pick<SessionDTO, "id">>
		> => {
			const { findUserById } = FindUserByIdUseCase();
			const { findRoleById } = FindRoleByIdUseCase();
			const { findSessionByUserIdAndRoleId, createSession } =
				SessionRemoteRepository(context);

			const { affectedIds: foundSessionsId } =
				await findSessionByUserIdAndRoleId({
					query: { userId, roleId },
				});

			if (foundSessionsId.length !== 0) {
				return { statusCode: 409 };
			}

			const { statusCode: findUserByIdStatusCode } = await findUserById({
				schemaArgs: { params: { id: userId } },
				context,
			});

			if (findUserByIdStatusCode !== 200) {
				return { statusCode: 400 };
			}

			const { statusCode: findRoleByIdStatusCode } = await findRoleById({
				schemaArgs: { params: { id: userId } },
				context,
			});

			if (findRoleByIdStatusCode !== 200) {
				return { statusCode: 400 };
			}

			context.providers.sessionProvider.addToSession("user", { id: userId });

			const { affectedIds: createdSessionsId } = await createSession({
				args: { userId, roleId, isTerminated: false },
			});

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
