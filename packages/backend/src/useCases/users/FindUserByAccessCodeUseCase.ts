import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import {
	type FindUserByAccessCodeRequest,
	type UserDTO,
	userDTOMapper,
} from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindUserByAccessCodeUseCase = () => {
	return {
		findUserByAccessCode: async ({
			schemaArgs: {
				params: { accessCode },
			},
			context,
		}: UseCaseRequest<FindUserByAccessCodeRequest>): Promise<
			UseCaseResponse<UserDTO>
		> => {
			const { findUsers } = UserRemoteRepository(context);
			const { affectedRows: foundUsersRow } = await findUsers();

			for (const foundUserRow of foundUsersRow) {
				const isSameAccessCode = await context.providers.hashProvider.compare(
					accessCode,
					foundUserRow.accessCode,
				);

				if (isSameAccessCode === true) {
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
