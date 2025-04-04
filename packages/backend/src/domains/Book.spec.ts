import { describe, expect, it } from "vitest";
import {
	type BookDTO,
	bookDTOMapper,
	type BookEntity,
	createBookSchema,
	findBooksByDossierIdSchema,
	findBookByIdSchema,
	updateBookByIdSchema,
	findBooksByCategoryIdSchema,
	findBooksSchema,
} from "./Book";

describe("Book", () => {
	describe("bookDTOMapper", () => {
		const date = new Date().toISOString();

		const bookEntity: BookEntity = {
			id: 1,
			dossierId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 1,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		const bookDTO: BookDTO = {
			id: 1,
			dossierId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 1,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		it("returns bookDTO", () => {
			expect(bookDTOMapper(bookEntity)).toEqual(bookDTO);
		});
	});

	describe("findBooksSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findBooksSchema.safeParse(data);
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

	describe("findBookByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findBookByIdSchema.safeParse(data);
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
			expect(
				parseSchema({
					// Missing params object
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema missing id field error", () => {
			expect(
				parseSchema({
					params: {
						// Missing id field
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("findBooksByDossierIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findBooksByDossierIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						dossierId: "123",
					},
				}),
			).toEqual({
				data: {
					params: {
						dossierId: 123,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid dossierId error", () => {
			expect(
				parseSchema({
					params: {
						dossierId: "A",
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

		it("returns schema missing dossierId field error", () => {
			expect(
				parseSchema({
					params: {},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("findBooksByCategoryIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findBooksByCategoryIdSchema.safeParse(data);
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
						categoryId: 123,
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

	describe("createBookSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createBookSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						dossierId: "123",
						categoryId: "123",
						designation: "Book Title",
						description: "This is a book description.",
						price: 19.99,
					},
				}),
			).toEqual({
				data: {
					body: {
						dossierId: 123,
						categoryId: "123",
						designation: "Book Title",
						description: "This is a book description.",
						price: 19.99,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid dossierId error", () => {
			expect(
				parseSchema({
					body: {
						dossierId: "A",
						categoryId: "123",
						designation: "Book Title",
						description: "This is a book description.",
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
					body: {},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid categoryId error", () => {
			expect(
				parseSchema({
					body: {
						dossierId: "123",
						categoryId: "A",
						designation: "Book Title",
						description: "This is a book description.",
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
						dossierId: "123",
						categoryId: "123",
						designation: "Book Title",
						description: "This is a book description.",
						price: "19.99",
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
						dossierId: "123",
						categoryId: "123",
						description: "This is a book description.",
						price: 19.99,
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
						dossierId: "123",
						categoryId: "123",
						designation: "Book Title",
						price: 19.99,
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
						dossierId: "123",
						categoryId: "123",
						designation: "Book Title",
						description: "This is a book description.",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateBookByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateBookByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Updated Book Title",
						description: "This is an updated book description.",
						price: 29.99,
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
						designation: "Updated Book Title",
						description: "This is an updated book description.",
						price: 29.99,
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
						designation: "Updated Book Title",
						description: "This is an updated book description.",
						price: 29.99,
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
					params: {
						// Missing id field
					},
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
						designation: "Updated Book Title",
						description: "This is an updated book description.",
						price: "29.99",
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
						designation: "Updated Book Title",
						description: "This is an updated book description.",
						price: 29.99,
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
