import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import type { UpdateRoleByIdRequest, RoleDTO } from "../../domains/Role";
import type { Context } from "../../signatures/Context";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";

const UpdateRoleByIdUseCase = (context: Context) => {
	const repository = RoleRemoteRepository(context);

	return {
		updateRoleById: async ({
			schemaArgs: {
				params: { id },
				body: { designation },
			},
		}: UseCaseRequest<UpdateRoleByIdRequest>): Promise<
			UseCaseResponse<Pick<RoleDTO, "id" | "updatedAt">>
		> => {
			const { affectedIds: foundRolesId } = await repository.findRoleById({
				query: { id },
			});

			if (foundRolesId.length === 0) {
				return { statusCode: 404 };
			}

			const { affectedIds: updatedRolesId, affectedRows: updatedRolesRow } =
				await repository.updateRoleById({
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
