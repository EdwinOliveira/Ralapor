import { describe, expect, it } from "vitest";
import {
	createPageSchema,
	findPageByIdSchema,
	findPagesByCategoryIdSchema,
	findPagesByChapterIdSchema,
	findPagesSchema,
	pageDTOMapper,
	updatePageByIdSchema,
	type PageDTO,
	type PageEntity,
} from "./Page";

describe("Page", () => {
	describe("pageDTOMapper", () => {
		const date = new Date().toISOString();

		const pageEntity: PageEntity = {
			id: 1,
			chapterId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 1,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		const pageDTO: PageDTO = {
			id: 1,
			chapterId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 1,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		it("returns pageDTO", () => {
			expect(pageDTOMapper(pageEntity)).toEqual(pageDTO);
		});
	});

	describe("findPagesSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findPagesSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						minLimit: 0,
						maxLimit: 100,
					},
				}),
			).toEqual({
				data: {
					params: {
						minLimit: 0,
						maxLimit: 100,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid minLimit error", () => {
			expect(
				parseSchema({
					params: {
						minLimit: "0",
						maxLimit: 100,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid maxLimit error", () => {
			expect(
				parseSchema({
					params: {
						minLimit: 0,
						maxLimit: "100",
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

		it("returns schema missing minLimit field error", () => {
			expect(
				parseSchema({
					params: {
						maxLimit: 100,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing maxLimit field error", () => {
			expect(
				parseSchema({
					params: {
						minLimit: 0,
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("findPageByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findPageByIdSchema.safeParse(data);
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

	describe("findPagesByChapterIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findPagesByChapterIdSchema.safeParse(data);
		};

		it("returns schema parse", () => {
			expect(parseSchema({ params: { chapterId: "1" } })).toEqual({
				data: { params: { chapterId: 1 } },
				success: true,
			});
		});

		it("returns schema invalid string error", () => {
			expect(parseSchema({ params: { chapterId: 1 } })).containSubset({
				success: false,
			});
		});

		it("returns schema string parse error", () => {
			expect(parseSchema({ params: { chapterId: "A" } })).containSubset({
				success: false,
			});
		});
	});

	describe("findPagesByCategoryIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findPagesByCategoryIdSchema.safeParse(data);
		};

		it("returns schema parse", () => {
			expect(parseSchema({ params: { categoryId: "1" } })).toEqual({
				data: { params: { categoryId: 1 } },
				success: true,
			});
		});

		it("returns schema invalid string error", () => {
			expect(parseSchema({ params: { categoryId: 1 } })).containSubset({
				success: false,
			});
		});

		it("returns schema string parse error", () => {
			expect(parseSchema({ params: { categoryId: "A" } })).containSubset({
				success: false,
			});
		});
	});

	describe("createPageSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createPageSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						chapterId: "123",
						categoryId: "123",
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
					},
				}),
			).toEqual({
				data: {
					body: {
						chapterId: 123,
						categoryId: "123",
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid chapterId error", () => {
			expect(
				parseSchema({
					body: {
						chapterId: "A",
						categoryId: "123",
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
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
						chapterId: "123",
						categoryId: "A",
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
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
						categoryId: "123",
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid price error", () => {
			expect(
				parseSchema({
					body: {
						chapterId: "123",
						categoryId: "123",
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: "19.99",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updatePageByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updatePageByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
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
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
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
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
						isVisible: true,
						isActive: false,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing required fields error", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						// Missing all optional fields
					},
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

		it("returns schema invalid price error", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: "19.99",
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
						designation: "Chapter 1",
						description: "This is the first chapter.",
						price: 19.99,
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
