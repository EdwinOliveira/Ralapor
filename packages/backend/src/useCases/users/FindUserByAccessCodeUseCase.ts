import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import {
	type FindUserByAccessCodeRequest,
	type UserDTO,
	userDTOMapper,
} from "../../domains/User";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import { HashProvider } from "../../providers/HashProvider";

const FindUserByAccessCodeUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();

	return {
		findUserByAccessCode: async ({
			schemaArgs: {
				params: { accessCode },
			},
		}: UseCaseRequest<FindUserByAccessCodeRequest>): Promise<
			UseCaseResponse<UserDTO>
		> => {
			const { affectedRows: foundUsersRow } = await repository.findUsers();

			for (const foundUserRow of foundUsersRow) {
				const isSameAccessCode = await hashProvider.compare(
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
