import { describe, expect, it } from "vitest";
import {
	createProfileSchema,
	findProfileByIdSchema,
	findProfileByUserIdSchema,
	profileDTOMapper,
	updateProfileByIdSchema,
	type ProfileDTO,
	type ProfileEntity,
} from "./Profile";

describe("Profile", () => {
	const dateBirth = new Date("1990-01-01").toISOString();

	describe("profileDTOMapper", () => {
		const date = new Date().toISOString();

		const profileEntity: ProfileEntity = {
			id: 1,
			userId: 101,
			firstName: "dummyFirstName",
			lastName: "dummyLastName",
			dateBirth: dateBirth,
			createdAt: date,
			updatedAt: date,
		};

		const profileDTO: ProfileDTO = {
			id: 1,
			userId: 101,
			firstName: "dummyFirstName",
			lastName: "dummyLastName",
			dateBirth: dateBirth,
			createdAt: date,
			updatedAt: date,
		};

		it("returns profileDTO", () => {
			expect(profileDTOMapper(profileEntity)).toEqual(profileDTO);
		});
	});

	describe("findProfileByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findProfileByIdSchema.safeParse(data);
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

	describe("findProfileByUserIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findProfileByUserIdSchema.safeParse(data);
		};

		it("returns schema parse", () => {
			expect(parseSchema({ params: { userId: "1" } })).toEqual({
				data: { params: { userId: 1 } },
				success: true,
			});
		});

		it("returns schema invalid string error", () => {
			expect(parseSchema({ params: { userId: 1 } })).containSubset({
				success: false,
			});
		});

		it("returns schema string parse error", () => {
			expect(parseSchema({ params: { userId: "A" } })).containSubset({
				success: false,
			});
		});
	});

	describe("createProfileSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createProfileSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						userId: "123",
						firstName: "dummyFirstName",
						lastName: "dummyLastName",
						dateBirth: dateBirth,
					},
				}),
			).toEqual({
				data: {
					body: {
						userId: 123,
						firstName: "dummyFirstName",
						lastName: "dummyLastName",
						dateBirth: dateBirth,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid userId error", () => {
			expect(
				parseSchema({
					body: {
						userId: "A",
						firstName: "dummyFirstName",
						lastName: "dummyLastName",
						dateBirth: dateBirth,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing required fields error", () => {
			expect(
				parseSchema({
					body: {
						firstName: "dummyFirstName",
						lastName: "dummyLastName",
						dateBirth: dateBirth,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid dateBirth error", () => {
			expect(
				parseSchema({
					body: {
						userId: "123",
						firstName: "dummyFirstName",
						lastName: "dummyLastName",
						dateBirth: "invalid-date",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateProfileByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateProfileByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input with all fields", () => {
			expect(
				parseSchema({
					params: { id: "123" },
					body: {
						firstName: "dummyFirstName",
						lastName: "dummyLastName",
						dateBirth: dateBirth,
					},
				}),
			).toEqual({
				data: {
					params: { id: 123 },
					body: {
						firstName: "dummyFirstName",
						lastName: "dummyLastName",
						dateBirth: dateBirth,
					},
				},
				success: true,
			});
		});

		it("returns schema parse for valid input with optional fields missing", () => {
			expect(
				parseSchema({
					params: { id: "123" },
					body: {
						firstName: "dummyFirstName",
					},
				}),
			).toEqual({
				data: {
					params: { id: 123 },
					body: {
						firstName: "dummyFirstName",
					},
				},
				success: true,
			});
		});

		it("returns schema invalid id error", () => {
			expect(
				parseSchema({
					params: { id: "A" },
					body: {
						firstName: "dummyFirstName",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing params.id error", () => {
			expect(
				parseSchema({
					body: {
						firstName: "dummyFirstName",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid dateBirth error", () => {
			expect(
				parseSchema({
					params: { id: "123" },
					body: {
						dateBirth: "invalid-date",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});
});
