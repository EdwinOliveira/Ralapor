import type { CreateRoleRequest, RoleDTO } from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const CreateRoleUseCase = () => {
	return {
		createRole: async ({
			schemaArgs: {
				body: { designation },
			},
			context,
		}: UseCaseRequest<CreateRoleRequest>): Promise<
			UseCaseResponse<Pick<RoleDTO, "id">>
		> => {
			const { findRoleByDesignation, createRole } =
				RoleRemoteRepository(context);

			const { affectedIds: foundRolesId } = await findRoleByDesignation({
				query: { designation },
			});

			if (foundRolesId.length !== 0) {
				return { statusCode: 409 };
			}

			const { affectedIds: createdRolesId } = await createRole({
				args: { designation },
			});

			if (createdRolesId.length === 0) {
				return { statusCode: 500 };
			}

			return {
				statusCode: 201,
				args: { id: createdRolesId[0] },
			};
		},
	};
};

export { CreateRoleUseCase };
