import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type {
	SessionDTO,
	DestroySessionByIdRequest,
} from "../../domains/Session";
import { SessionRemoteRepository } from "../../repositories/SessionRemoteRepository";
import type { Context } from "../../signatures/Context";

const DestroySessionByIdUseCase = (context: Context) => {
	const repository = SessionRemoteRepository(context);

	return {
		destroySessionById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<DestroySessionByIdRequest>): Promise<
			UseCaseResponse<Pick<SessionDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundSessionsId } = await repository.findSessionById(
				{ query: { id } },
			);

			if (foundSessionsId.length === 0) {
				return { statusCode: 404 };
			}

			context.providers.sessionProvider.destroySession();

			const {
				affectedIds: updatedSessionsId,
				affectedRows: updatedSessionsRow,
			} = await repository.updateSessionById({
				query: { id },
				args: { expiresIn: "", isTerminated: true },
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
