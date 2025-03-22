import { describe, expect, it } from "vitest";
import {
	type ChapterDTO,
	chapterDTOMapper,
	type ChapterEntity,
	createChapterSchema,
	findChaptersByBookIdSchema,
	findChapterByIdSchema,
	updateChapterByIdSchema,
	findChaptersByCategoryIdSchema,
} from "./Chapter";

describe("Chapter", () => {
	describe("chapterDTOMapper", () => {
		const date = new Date().toISOString();

		const chapterEntity: ChapterEntity = {
			id: 1,
			bookId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 19.99,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		const chapterDTO: ChapterDTO = {
			id: 1,
			bookId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 19.99,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		it("returns chapterDTO", () => {
			expect(chapterDTOMapper(chapterEntity)).toEqual(chapterDTO);
		});
	});

	describe("findChapterByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findChapterByIdSchema.safeParse(data);
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

	describe("findChaptersByBookIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findChaptersByBookIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						bookId: "123",
					},
				}),
			).toEqual({
				data: {
					params: {
						bookId: 123,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid bookId error", () => {
			expect(
				parseSchema({
					params: {
						bookId: "A",
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

		it("returns schema missing bookId field error", () => {
			expect(
				parseSchema({
					params: {},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("findChaptersByCategoryIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findChaptersByCategoryIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						categoryId: "123",
					},
				}),
			).toEqual({
				data: {
					params: {
						categoryId: "123",
					},
				},
				success: true,
			});
		});

		it("returns schema invalid categoryId error", () => {
			expect(
				parseSchema({
					params: {
						categoryId: "A",
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

		it("returns schema missing categoryId field error", () => {
			expect(
				parseSchema({
					params: {},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("createChapterSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createChapterSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						bookId: "123",
						categoryId: "123",
						designation: "Chapter Title",
						description: "This is a chapter description.",
						price: 9.99,
					},
				}),
			).toEqual({
				data: {
					body: {
						bookId: 123,
						categoryId: "123",
						designation: "Chapter Title",
						description: "This is a chapter description.",
						price: 9.99,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid bookId error", () => {
			expect(
				parseSchema({
					body: {
						bookId: "A",
						categoryId: "123",
						designation: "Chapter Title",
						description: "This is a chapter description.",
						price: 9.99,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid categoryId error", () => {
			expect(
				parseSchema({
					body: {
						bookId: "123",
						categoryId: "A",
						designation: "Chapter Title",
						description: "This is a chapter description.",
						price: 9.99,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing required fields error", () => {
			expect(
				parseSchema({
					body: {},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid price error", () => {
			expect(
				parseSchema({
					body: {
						bookId: "123",
						categoryId: "123",
						designation: "Chapter Title",
						description: "This is a chapter description.",
						price: "9.99",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing designation error", () => {
			expect(
				parseSchema({
					body: {
						bookId: "123",
						categoryId: "123",
						description: "This is a chapter description.",
						price: 9.99,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing description error", () => {
			expect(
				parseSchema({
					body: {
						bookId: "123",
						categoryId: "123",
						designation: "Chapter Title",
						price: 9.99,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing price error", () => {
			expect(
				parseSchema({
					body: {
						bookId: "123",
						categoryId: "123",
						designation: "Chapter Title",
						description: "This is a chapter description.",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateChapterByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateChapterByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Updated Chapter Title",
						description: "This is an updated chapter description.",
						price: 14.99,
						isVisible: true,
						isActive: false,
					},
				}),
			).toEqual({
				data: {
					params: {
						id: 123,
					},
					body: {
						designation: "Updated Chapter Title",
						description: "This is an updated chapter description.",
						price: 14.99,
						isVisible: true,
						isActive: false,
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
					body: {
						designation: "Updated Chapter Title",
						description: "This is an updated chapter description.",
						price: 14.99,
						isVisible: true,
						isActive: false,
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

		it("returns schema invalid price error", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Updated Chapter Title",
						description: "This is an updated chapter description.",
						price: "14.99",
						isVisible: true,
						isActive: false,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid boolean fields error", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Updated Chapter Title",
						description: "This is an updated chapter description.",
						price: 14.99,
						isVisible: "true",
						isActive: "false",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});
});
