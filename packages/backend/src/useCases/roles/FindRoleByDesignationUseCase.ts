import {
	type FindRoleByDesignationRequest,
	type RoleDTO,
	roleDTOMapper,
} from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";
import type { Context } from "../../signatures/Context";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindRoleByDesignationUseCase = (context: Context) => {
	const repository = RoleRemoteRepository(context);

	return {
		findRoleByDesignation: async ({
			schemaArgs: {
				params: { designation },
			},
		}: UseCaseRequest<FindRoleByDesignationRequest>): Promise<
			UseCaseResponse<RoleDTO>
		> => {
			const { affectedRows: foundRolesRow } =
				await repository.findRoleByDesignation({
					query: { designation },
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

export { FindRoleByDesignationUseCase };
