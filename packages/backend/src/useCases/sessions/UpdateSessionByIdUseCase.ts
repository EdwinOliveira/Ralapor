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
			httpContext,
		}: UseCaseRequest<UpdateSessionByIdRequest>): Promise<
			UseCaseResponse<Pick<SessionDTO, "id" | "updatedAt">>
		> => {
			const { findSessionById, updateSessionById } =
				SessionRemoteRepository(httpContext);

			const { affectedIds: foundSessionsId } = await findSessionById({
				query: { id },
			});

			if (foundSessionsId.length === 0) {
				return { statusCode: 404 };
			}

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
