import {
	type FindRoleByIdRequest,
	type RoleDTO,
	roleDTOMapper,
} from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";
import type { Context } from "../../signatures/Context";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindRoleByIdUseCase = (context: Context) => {
	const repository = RoleRemoteRepository(context);

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
