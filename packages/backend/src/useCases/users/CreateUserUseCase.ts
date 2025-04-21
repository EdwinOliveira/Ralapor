import type { CreateUserRequest, UserDTO } from "../../domains/User";
import { UserRemoteRepository } from "../../repositories/UserRemoteRepository";
import type { UseCaseRequest, UseCaseResponse } from "../../signatures/UseCase";
import { FindRoleByDesignationUseCase } from "../roles/FindRoleByDesignationUseCase";

const CreateUserUseCase = () => {
	return {
		createUser: async ({
			schemaArgs: {
				body: { username, email, phoneNumber, phoneNumberCode },
			},
			context,
		}: UseCaseRequest<CreateUserRequest>): Promise<
			UseCaseResponse<Pick<UserDTO, "id">>
		> => {
			const { findRoleByDesignation } = FindRoleByDesignationUseCase();
			const { findUserByUsernameOrEmailOrPhoneNumber, createUser } =
				UserRemoteRepository(context);

			const { affectedIds: foundUsersId } =
				await findUserByUsernameOrEmailOrPhoneNumber({
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
				context,
			});

			if (
				findRoleByDesignationStatusCode !== 200 ||
				findRoleByDesignationArgs === undefined
			) {
				return { statusCode: 500 };
			}

			const accessCode = context.providers.randomProvider.createAccessCode(12);
			const hashedAccessCode =
				await context.providers.hashProvider.hash(accessCode);

			const { affectedIds: createdUsersId } = await createUser({
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
