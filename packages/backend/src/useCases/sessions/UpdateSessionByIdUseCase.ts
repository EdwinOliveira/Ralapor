import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type {
	UpdateSessionByIdRequest,
	SessionDTO,
} from "../../domains/Session";
import { SessionRemoteRepository } from "../../repositories/SessionRemoteRepository";

const UpdateSessionByIdUseCase = () => {
	return {
		updateSessionById: async ({
			schemaArgs: {
				params: { id },
			},
			context,
		}: UseCaseRequest<UpdateSessionByIdRequest>): Promise<
			UseCaseResponse<Pick<SessionDTO, "id" | "updatedAt">>
		> => {
			const { findSessionById, updateSessionById } =
				SessionRemoteRepository(context);

			const { affectedIds: foundSessionsId, affectedRows: foundSessionsRow } =
				await findSessionById({
					query: { id },
				});

			if (foundSessionsId.length === 0) {
				return { statusCode: 404 };
			}

			context.providers.sessionProvider.updateSession("user", {
				id: foundSessionsRow[0].userId,
			});

			const {
				affectedIds: updatedSessionsId,
				affectedRows: updatedSessionsRow,
			} = await updateSessionById({
				query: { id },
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

export { UpdateSessionByIdUseCase };
