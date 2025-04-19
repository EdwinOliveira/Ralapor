import {
	type FindRoleByIdRequest,
	type RoleDTO,
	roleDTOMapper,
} from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindRoleByIdUseCase = () => {
	const repository = RoleRemoteRepository();

	return {
		findRoleById: async ({
			schemaArgs: {
				params: { id },
			},
		}: UseCaseRequest<FindRoleByIdRequest>): Promise<
			UseCaseResponse<RoleDTO>
		> => {
			const { affectedRows: foundRolesRow } = await repository.findRoleById({
				query: { id },
			});

			if (foundRolesRow.length === 0) {
				return { statusCode: 404 };
			}

			return {
				statusCode: 200,
				args: roleDTOMapper(foundRolesRow[0]),
			};
		},
	};
};

export { FindRoleByIdUseCase };
