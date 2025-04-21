import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type { UpdateRoleByIdRequest, RoleDTO } from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";

const UpdateRoleByIdUseCase = () => {
	return {
		updateRoleById: async ({
			schemaArgs: {
				params: { id },
				body: { designation },
			},
			httpContext,
		}: UseCaseRequest<UpdateRoleByIdRequest>): Promise<
			UseCaseResponse<Pick<RoleDTO, "id" | "updatedAt">>
		> => {
			const { findRoleById, updateRoleById } =
				RoleRemoteRepository(httpContext);

			const { affectedIds: foundRolesId } = await findRoleById({
				query: { id },
			});

			if (foundRolesId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedRolesId, affectedRows: updatedRolesRow } =
				await updateRoleById({
					query: { id },
					args: { designation },
				});

			if (updatedRolesId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: {
					id: updatedRolesId[0],
					updatedAt: updatedRolesRow[0].updatedAt,
				},
			};
		},
	};
};

export { UpdateRoleByIdUseCase };
