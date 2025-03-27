import { describe, expect, it } from "vitest";
import {
	createDossierSchema,
	type DossierDTO,
	dossierDTOMapper,
	type DossierEntity,
	findDossierByIdSchema,
	findDossiersByCategoryIdSchema,
	findDossiersByUserIdSchema,
	findDossiersSchema,
	updateDossierByIdSchema,
} from "./Dossier";

describe("Dossier", () => {
	describe("dossierDTOMapper", () => {
		const date = new Date().toISOString();

		const dossierEntity: DossierEntity = {
			id: 1,
			userId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 19.99,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		const dossierDTO: DossierDTO = {
			id: 1,
			userId: 101,
			categoryId: 101,
			designation: "dummyDesignation",
			description: "dummyDescription",
			price: 19.99,
			isVisible: true,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		it("returns dossierDTO", () => {
			expect(dossierDTOMapper(dossierEntity)).toEqual(dossierDTO);
		});
	});

	describe("findDossiersSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findDossiersSchema.safeParse(data);
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

	describe("findDossierByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findDossierByIdSchema.safeParse(data);
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

	describe("findDossiersByUserIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findDossiersByUserIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						userId: "123",
					},
				}),
			).toEqual({
				data: {
					params: {
						userId: 123,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid userId error", () => {
			expect(
				parseSchema({
					params: {
						userId: "A",
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

		it("returns schema missing userId field error", () => {
			expect(
				parseSchema({
					params: {
						// Missing userId field
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("findDossiersByCategoryIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findDossiersByCategoryIdSchema.safeParse(data);
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

		it("returns schema missing userId field error", () => {
			expect(
				parseSchema({
					params: {},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("createDossierSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createDossierSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						userId: "123",
						categoryId: "123",
						designation: "Dossier Title",
						description: "This is a dossier description.",
						price: 29.99,
					},
				}),
			).toEqual({
				data: {
					body: {
						userId: 123,
						categoryId: "123",
						designation: "Dossier Title",
						description: "This is a dossier description.",
						price: 29.99,
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
						designation: "Dossier Title",
						description: "This is a dossier description.",
						price: 29.99,
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
						userId: "123",
						categoryId: "A",
						designation: "Dossier Title",
						description: "This is a dossier description.",
						price: 29.99,
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
						userId: "123",
						categoryId: "123",
						designation: "Dossier Title",
						description: "This is a dossier description.",
						price: "29.99",
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
						userId: "123",
						categoryId: "123",
						description: "This is a dossier description.",
						price: 29.99,
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
						userId: "123",
						categoryId: "123",
						designation: "Dossier Title",
						price: 29.99,
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
						userId: "123",
						categoryId: "123",
						designation: "Dossier Title",
						description: "This is a dossier description.",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateDossierByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateDossierByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Updated Dossier Title",
						description: "This is an updated dossier description.",
						price: 39.99,
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
						designation: "Updated Dossier Title",
						description: "This is an updated dossier description.",
						price: 39.99,
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
						designation: "Updated Dossier Title",
						description: "This is an updated dossier description.",
						price: 39.99,
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

		it("returns schema invalid price error", () => {
			expect(
				parseSchema({
					params: {
						id: "123",
					},
					body: {
						designation: "Updated Dossier Title",
						description: "This is an updated dossier description.",
						price: "39.99",
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
						designation: "Updated Dossier Title",
						description: "This is an updated dossier description.",
						price: 39.99,
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
