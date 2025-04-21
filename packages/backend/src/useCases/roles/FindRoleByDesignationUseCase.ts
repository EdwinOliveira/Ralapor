import {
	type FindRoleByDesignationRequest,
	type RoleDTO,
	roleDTOMapper,
} from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const FindRoleByDesignationUseCase = () => {
	return {
		findRoleByDesignation: async ({
			schemaArgs: {
				params: { designation },
			},
			context,
		}: UseCaseRequest<FindRoleByDesignationRequest>): Promise<
			UseCaseResponse<RoleDTO>
		> => {
			const { findRoleByDesignation } = RoleRemoteRepository(context);

			const { affectedRows: foundRolesRow } = await findRoleByDesignation({
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
