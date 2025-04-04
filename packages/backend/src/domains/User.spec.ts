import { describe, expect, it } from "vitest";
import {
	createUserSchema,
	findUserByAccessCodeSchema,
	findUserByIdSchema,
	updateUserAccessCodeByIdSchema,
	updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema,
	updateUserByIdSchema,
	type UserDTO,
	userDTOMapper,
	type UserEntity,
} from "./User";

describe("User", () => {
	describe("userDTOMapper", () => {
		const date = new Date().toISOString();

		const user: UserEntity = {
			id: 1,
			username: "dummyUsername",
			email: "dummyEmail",
			phoneNumber: "dummyPhoneNumber",
			phoneNumberCode: "dummyPhoneNumberCode",
			accessCode: "dummyAccessCode",
			createdAt: date,
			updatedAt: date,
		};

		const userDTO: UserDTO = {
			id: 1,
			username: "dummyUsername",
			email: "dummyEmail",
			phoneNumber: "dummyPhoneNumber",
			phoneNumberCode: "dummyPhoneNumberCode",
			createdAt: date,
			updatedAt: date,
		};

		it("returns userDTO", () => {
			expect(userDTOMapper(user)).toEqual(userDTO);
		});
	});

	describe("findUserByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findUserByIdSchema.safeParse(data);
		};

		it("returns schema parse", () => {
			expect(parseSchema({ params: { id: "1" } })).toEqual({
				data: { params: { id: 1 } },
				success: true,
			});
		});

		it("returns schema invalid string error", () => {
			expect(parseSchema({ params: { id: 1 } })).containSubset({
				success: false,
			});
		});

		it("returns schema string parse error", () => {
			expect(parseSchema({ params: { id: "A" } })).containSubset({
				success: false,
			});
		});
	});

	describe("findUserByAccessCodeSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findUserByAccessCodeSchema.safeParse(data);
		};

		it("returns schema parse", () => {
			expect(parseSchema({ params: { accessCode: "1" } })).toEqual({
				data: { params: { accessCode: "1" } },
				success: true,
			});
		});

		it("returns schema invalid string error", () => {
			expect(parseSchema({ params: { accessCode: 1 } })).containSubset({
				success: false,
			});
		});
	});

	describe("createUserSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createUserSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						username: "testuser",
						email: "testuser@example.com",
						phoneNumber: "1234567890",
						phoneNumberCode: "+351",
					},
				}),
			).toEqual({
				data: {
					body: {
						username: "testuser",
						email: "testuser@example.com",
						phoneNumber: "1234567890",
						phoneNumberCode: "+351",
					},
				},
				success: true,
			});
		});

		it("returns schema invalid email error", () => {
			expect(
				parseSchema({
					body: {
						username: "testuser",
						email: "invalid-email",
						phoneNumber: "1234567890",
						phoneNumberCode: "+351",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid phoneNumberCode error", () => {
			expect(
				parseSchema({
					body: {
						username: "testuser",
						email: "testuser@example.com",
						phoneNumber: "1234567890",
						phoneNumberCode: "+99",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing username error", () => {
			expect(
				parseSchema({
					body: {
						email: "testuser@example.com",
						phoneNumber: "1234567890",
						phoneNumberCode: "+351",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing email error", () => {
			expect(
				parseSchema({
					body: {
						username: "testuser",
						phoneNumber: "1234567890",
						phoneNumberCode: "+351",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing phoneNumber error", () => {
			expect(
				parseSchema({
					body: {
						username: "testuser",
						email: "testuser@example.com",
						phoneNumberCode: "+351",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing phoneNumberCode error", () => {
			expect(
				parseSchema({
					body: {
						username: "testuser",
						email: "testuser@example.com",
						phoneNumber: "1234567890",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateUserByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateUserByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input with all fields", () => {
			expect(
				parseSchema({
					params: { id: "1" },
					body: {
						username: "testuser",
						email: "testuser@example.com",
						phoneNumber: "1234567890",
						phoneNumberCode: "+351",
					},
				}),
			).toEqual({
				data: {
					params: { id: 1 },
					body: {
						username: "testuser",
						email: "testuser@example.com",
						phoneNumber: "1234567890",
						phoneNumberCode: "+351",
					},
				},
				success: true,
			});
		});

		it("returns schema parse for valid input with optional fields missing", () => {
			expect(
				parseSchema({
					params: { id: "1" },
					body: {},
				}),
			).toEqual({
				data: {
					params: { id: 1 },
					body: {},
				},
				success: true,
			});
		});

		it("returns schema invalid id error", () => {
			expect(
				parseSchema({
					params: { id: "A" },
					body: {
						username: "testuser",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing id error", () => {
			expect(
				parseSchema({
					body: {
						username: "testuser",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid email error", () => {
			expect(
				parseSchema({
					params: { id: "1" },
					body: {
						email: "invalid-email",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid phoneNumberCode error", () => {
			expect(
				parseSchema({
					params: { id: "1" },
					body: {
						phoneNumberCode: "+99",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateUserAccessCodeByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateUserAccessCodeByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: { id: "1" },
				}),
			).toEqual({
				data: {
					params: { id: 1 },
				},
				success: true,
			});
		});

		it("returns schema invalid id error", () => {
			expect(
				parseSchema({
					params: { id: "A" },
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing params.id error", () => {
			expect(parseSchema({})).containSubset({
				success: false,
			});
		});
	});

	describe("updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateUserAccessCodeByUsernameOrEmailOrPhoneNumberSchema.safeParse(
				data,
			);
		};

		it("returns schema parse for valid input with username", () => {
			expect(
				parseSchema({
					params: { username: "testuser" },
				}),
			).toEqual({
				data: {
					params: { username: "testuser" },
				},
				success: true,
			});
		});

		it("returns schema parse for valid input with email", () => {
			expect(
				parseSchema({
					params: { email: "testuser@example.com" },
				}),
			).toEqual({
				data: {
					params: { email: "testuser@example.com" },
				},
				success: true,
			});
		});

		it("returns schema parse for valid input with phoneNumber", () => {
			expect(
				parseSchema({
					params: { phoneNumber: "1234567890" },
				}),
			).toEqual({
				data: {
					params: { phoneNumber: "1234567890" },
				},
				success: true,
			});
		});

		it("returns schema invalid email error", () => {
			expect(
				parseSchema({
					params: { email: "invalid-email" },
				}),
			).containSubset({
				success: false,
			});
		});
	});
});
