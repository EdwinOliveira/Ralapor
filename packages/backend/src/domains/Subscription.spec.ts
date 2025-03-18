import { describe, expect, it } from "vitest";
import {
	createSubscriptionSchema,
	findSubscriptionByIdSchema,
	findSubscriptionsByWalletIdSchema,
	type SubscriptionDTO,
	subscriptionDTOMapper,
	type SubscriptionEntity,
	updateSubscriptionByIdSchema,
} from "./Subscription";

describe("Subscription", () => {
	const date = new Date().toISOString();

	describe("subscriptionDTOMapper", () => {
		const subscriptionEntity: SubscriptionEntity = {
			id: 1,
			walletId: 101,
			dossierId: 201,
			bookId: 301,
			chapterId: 401,
			pageId: 501,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		const subscriptionDTO: SubscriptionDTO = {
			id: 1,
			walletId: 101,
			dossierId: 201,
			bookId: 301,
			chapterId: 401,
			pageId: 501,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		it("returns subscriptionDTO", () => {
			expect(subscriptionDTOMapper(subscriptionEntity)).toEqual(
				subscriptionDTO,
			);
		});
	});

	describe("findSubscriptionByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findSubscriptionByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
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

	describe("findSubscriptionsByWalletIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findSubscriptionsByWalletIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(parseSchema({ params: { walletId: "1" } })).toEqual({
				data: { params: { walletId: 1 } },
				success: true,
			});
		});

		it("returns schema invalid string error", () => {
			expect(parseSchema({ params: { walletId: 1 } })).containSubset({
				success: false,
			});
		});

		it("returns schema string parse error", () => {
			expect(parseSchema({ params: { walletId: "A" } })).containSubset({
				success: false,
			});
		});
	});

	describe("createSubscriptionSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createSubscriptionSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(
				parseSchema({
					body: {
						walletId: "123",
						dossierId: "201",
						bookId: "301",
						chapterId: "401",
						pageId: "501",
					},
				}),
			).toEqual({
				data: {
					body: {
						walletId: 123,
						dossierId: 201,
						bookId: 301,
						chapterId: 401,
						pageId: 501,
					},
				},
				success: true,
			});
		});

		it("returns schema invalid walletId error", () => {
			expect(
				parseSchema({
					body: {
						walletId: "A",
						dossierId: "201",
						bookId: "301",
						chapterId: "401",
						pageId: "501",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid dossierId error", () => {
			expect(
				parseSchema({
					body: {
						walletId: "123",
						dossierId: "A",
						bookId: "301",
						chapterId: "401",
						pageId: "501",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid bookId error", () => {
			expect(
				parseSchema({
					body: {
						walletId: "123",
						dossierId: "201",
						bookId: "A",
						chapterId: "401",
						pageId: "501",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid chapterId error", () => {
			expect(
				parseSchema({
					body: {
						walletId: "123",
						dossierId: "201",
						bookId: "301",
						chapterId: "A",
						pageId: "501",
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid pageId error", () => {
			expect(
				parseSchema({
					body: {
						walletId: "123",
						dossierId: "201",
						bookId: "301",
						chapterId: "401",
						pageId: "A",
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
						dossierId: "201",
						bookId: "301",
						chapterId: "401",
						pageId: "501",
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});

	describe("updateSubscriptionByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateSubscriptionByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input with all fields", () => {
			expect(
				parseSchema({
					params: { id: "123" },
					body: {
						isActive: true,
					},
				}),
			).toEqual({
				data: {
					params: { id: 123 },
					body: {
						isActive: true,
					},
				},
				success: true,
			});
		});

		it("returns schema parse for valid input with optional fields missing", () => {
			expect(
				parseSchema({
					params: { id: "123" },
					body: {},
				}),
			).toEqual({
				data: {
					params: { id: 123 },
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
						isActive: true,
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
						isActive: true,
					},
				}),
			).containSubset({
				success: false,
			});
		});

		it("returns schema invalid id type error", () => {
			expect(
				parseSchema({
					params: { id: 123 },
					body: {
						isActive: true,
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});
});
