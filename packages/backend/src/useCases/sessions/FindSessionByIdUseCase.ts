import {
	type FindSessionByIdRequest,
	type SessionDTO,
	sessionDTOMapper,
} from "../../domains/Session";
import { SessionRemoteRepository } from "../../repositories/SessionRemoteRepository";
import type { Context } from "../../signatures/Context";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindSessionByIdUseCase = (context: Context) => {
	const repository = SessionRemoteRepository(context);

	return {
		findSessionById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindSessionByIdRequest>): Promise<
			UseCaseResponse<SessionDTO>
		> => {
			const { affectedRows: foundSessionsRow } =
				await repository.findSessionById({
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
