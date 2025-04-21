import type { CreateUserRequest, UserDTO } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { Context } from "../../signatures/Context";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import { FindRoleByDesignationUseCase } from "../roles/FindRoleByDesignationUseCase";

const CreateUserUseCase = (context: Context) => {
	const { findRoleByDesignation } = FindRoleByDesignationUseCase(context);
	const repository = UserRemoteRepository(context);

	return {
		createUser: async ({
			schemaArgs: {
				body: { username, email, phoneNumber, phoneNumberCode },
			},
		}: UseCaseRequest<CreateUserRequest>): Promise<
			UseCaseResponse<Pick<UserDTO, "id">>
		> => {
			const { affectedIds: foundUsersId } =
				await repository.findUserByUsernameOrEmailOrPhoneNumber({
					query: { username, email, phoneNumber },
				});

			if (foundUsersId.length !== 0) {
				return { statusCode: 409 };
			}

			const {
				statusCode: findRoleByDesignationStatusCode,
				args: findRoleByDesignationArgs,
			} = await findRoleByDesignation({
				schemaArgs: { params: { designation: "consumer" } },
			});

			if (
				findRoleByDesignationStatusCode !== 200 ||
				findRoleByDesignationArgs === undefined
			) {
				return { statusCode: 500 };
			}

			const { randomProvider, hashProvider } = context.providers;

			const accessCode = randomProvider.createAccessCode(12);
			const hashedAccessCode = await hashProvider.hash(accessCode);

			const { affectedIds: createdUsersId } = await repository.createUser({
				args: {
					username,
					email,
					phoneNumber,
					phoneNumberCode,
					roleId: findRoleByDesignationArgs.id,
					accessCode: hashedAccessCode,
				},
			});

			if (createdUsersId.length === 0) {
				return { statusCode: 500 };
			}

			console.log(accessCode);

			return {
				statusCode: 201,
				args: { id: createdUsersId[0] },
			};
		},
	};
};

export { CreateUserUseCase };
