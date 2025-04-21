import {
	type FindSessionByIdRequest,
	type SessionDTO,
	sessionDTOMapper,
} from "../../domains/Session";
import { SessionRemoteRepository } from "../../repositories/SessionRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindSessionByIdUseCase = () => {
	return {
		findSessionById: async ({
			schemaArgs: {
				params: { id },
			},
			context,
		}: UseCaseRequest<FindSessionByIdRequest>): Promise<
			UseCaseResponse<SessionDTO>
		> => {
			const { findSessionById } = SessionRemoteRepository(context);

			const { affectedRows: foundSessionsRow } = await findSessionById({
				query: { id },
			});

			if (foundSessionsRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: sessionDTOMapper(foundSessionsRow[0]),
			};
		},
	};
};

export { FindSessionByIdUseCase };
