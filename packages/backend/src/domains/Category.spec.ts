import { describe, expect, it } from "vitest";
import {
	categoryDTOMapper,
	createCategorySchema,
	findCategoryByIdSchema,
	updateCategoryByIdSchema,
	type CategoryEntity,
} from "./Category";

describe("Category", () => {
	describe("categoryDTOMapper", () => {
		const date = new Date().toISOString();

		const chapterEntity: CategoryEntity = {
			id: 1,
			designation: "dummyDesignation",
			createdAt: date,
			updatedAt: date,
		};

		const categoryDTO: CategoryEntity = {
			id: 1,
			designation: "dummyDesignation",
			createdAt: date,
			updatedAt: date,
		};

		it("returns categoryDTOMapper", () => {
			expect(categoryDTOMapper(chapterEntity)).toEqual(categoryDTO);
		});
	});

	describe("findCategoryByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findCategoryByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
				}),
			).toEqual({
				data: {
					params: {
						id: 123,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid id error", () => {
			expect(
				parseSchema({
					params: {
						id: "A",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing required fields error", () => {
			expect(parseSchema({})).containSubset({
				success: false,
			});
		});

		it("returns schema missing id field error", () => {
			expect(
				parseSchema({
					params: {},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("createCategorySchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createCategorySchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						designation: "Category Name",
					},
				}),
			).toEqual({
				data: {
					body: {
						designation: "Category Name",
					},
				},
				success: true,
			});
		});

		it("returns schema missing required fields error", () => {
			expect(parseSchema({})).containSubset({
				success: false,
			});
		});

		it("returns schema missing designation field error", () => {
			expect(
				parseSchema({
					body: {},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid designation type error", () => {
			expect(
				parseSchema({
					body: {
						designation: 123, // Invalid type
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateCategoryByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateCategoryByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input with designation", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Updated Category Name",
					},
				}),
			).toEqual({
				data: {
					params: {
						id: 123,
					},
					body: {
						designation: "Updated Category Name",
					},
				},
				success: true,
			});
		});

		it("returns schema parse for valid input without designation", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {},
				}),
			).toEqual({
				data: {
					params: {
						id: 123,
					},
					body: {},
				},
				success: true,
			});
		});

		it("returns schema invalid id error", () => {
			expect(
				parseSchema({
					params: {
						id: "A",
					},
					body: {
						designation: "Updated Category Name",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing required fields error", () => {
			expect(parseSchema({})).containSubset({
				success: false,
			});
		});

		it("returns schema missing id field error", () => {
			expect(
				parseSchema({
					params: {},
					body: {
						designation: "Updated Category Name",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid designation type error", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: 123, // Invalid type
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});
});
