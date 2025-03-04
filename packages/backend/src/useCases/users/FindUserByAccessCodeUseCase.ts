import type { Request, Response } from "express";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import { findUserByAccessCodeSchema, userDTOMapper } from "../../domains/User";
import { HashProvider } from "../../providers/HashProvider";

const FindUserByAccessCodeUseCase = () => {
	const repository = UserRemoteRepository();
	const hashProvider = HashProvider();

	return {
		findUserByAccessCode: async (request: Request, response: Response) => {
			const { data: schemaArgs, error: schemaErrors } =
				findUserByAccessCodeSchema.safeParse({ params: request.params });

			if (schemaErrors !== undefined) {
				return response.status(400).json({ errors: schemaErrors.issues });
			}

			const { affectedRows } = await repository.findUsers();

			for (const affectedRow of affectedRows) {
				const isSameAccessCode = await hashProvider.compare(
					schemaArgs.params.accessCode,
					affectedRow.accessCode,
				);

				if (isSameAccessCode === true) {
					const mappedUser = userDTOMapper(affectedRows[0]);
					return response.status(200).json({ data: mappedUser });
				}
			}

			return response.status(404).json();
		},
	};
};

export { FindUserByAccessCodeUseCase };
