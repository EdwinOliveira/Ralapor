import type { CreateRoleRequest, RoleDTO } from "../../domains/Role";
import { RoleRemoteRepository } from "../../repositories/RoleRemoteRepository";
import type { Context } from "../../signatures/Context";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";

const CreateRoleUseCase = (context: Context) => {
	const repository = RoleRemoteRepository(context);

	return {
		createRole: async ({
			schemaArgs: {
				body: { designation },
			},
		}: UseCaseRequest<CreateRoleRequest>): Promise<
			UseCaseResponse<Pick<RoleDTO, "id">>
		> => {
			const { affectedIds: foundRolesId } =
				await repository.findRoleByDesignation({
					query: { designation },
				});

			if (foundRolesId.length !== 0) {
				return { statusCode: 409 };
			}

			const { affectedIds: createdRolesId } = await repository.createRole({
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
