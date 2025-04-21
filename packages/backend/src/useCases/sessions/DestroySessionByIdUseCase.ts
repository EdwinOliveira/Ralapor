import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type {
	SessionDTO,
	DestroySessionByIdRequest,
} from "../../domains/Session";
import { SessionRemoteRepository } from "../../repositories/SessionRemoteRepository";

const DestroySessionByIdUseCase = () => {
	return {
		destroySessionById: async ({
			schemaArgs: {
				params: { id },
			},
			context,
		}: UseCaseRequest<DestroySessionByIdRequest>): Promise<
			UseCaseResponse<Pick<SessionDTO, "id" | "updatedAt">>
		> => {
			const { findSessionById, updateSessionById } =
				SessionRemoteRepository(context);

			const { affectedIds: foundSessionsId } = await findSessionById({
				query: { id },
			});

			if (foundSessionsId.length === 0) {
				return { statusCode: 404 };
			}

			context.providers.sessionProvider.destroySession();

			const {
				affectedIds: updatedSessionsId,
				affectedRows: updatedSessionsRow,
			} = await updateSessionById({
				query: { id },
				args: { isTerminated: true },
			});

			if (updatedSessionsId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedSessionsId[0],
					updatedAt: updatedSessionsRow[0].updatedAt,
				},
			};
		},
	};
};

export { DestroySessionByIdUseCase };
