import { describe, expect, it } from "vitest";
import {
	createWalletSchema,
	findWalletByIdSchema,
	findWalletByUserIdSchema,
	updateWalletByIdSchema,
	type WalletDTO,
	walletDTOMapper,
	type WalletEntity,
} from "./Wallet";

describe("Wallet", () => {
	describe("walletDTOMapper", () => {
		const date = new Date().toISOString();

		const walletEntity: WalletEntity = {
			id: 1,
			userId: 101,
			funds: 500,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		const walletDTO: WalletDTO = {
			id: 1,
			userId: 101,
			funds: 500,
			isActive: true,
			createdAt: date,
			updatedAt: date,
		};

		it("returns walletDTO", () => {
			expect(walletDTOMapper(walletEntity)).toEqual(walletDTO);
		});
	});

	describe("findWalletByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findWalletByIdSchema.safeParse(data);
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

		it("returns schema missing params.id error", () => {
			expect(parseSchema({ params: {} })).containSubset({
				success: false,
			});
		});
	});

	describe("findWalletByUserIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return findWalletByUserIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
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

		it("returns schema missing params.userId error", () => {
			expect(parseSchema({ params: {} })).containSubset({
				success: false,
			});
		});
	});

	describe("createWalletSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return createWalletSchema.safeParse(data);
		};

		it("returns schema parse for valid input", () => {
			expect(parseSchema({ body: { userId: "123" } })).toEqual({
				data: { body: { userId: 123 } },
				success: true,
			});
		});

		it("returns schema invalid userId error", () => {
			expect(parseSchema({ body: { userId: "A" } })).containSubset({
				success: false,
			});
		});

		it("returns schema missing required fields error", () => {
			expect(parseSchema({ body: {} })).containSubset({
				success: false,
			});
		});

		it("returns schema invalid userId type error", () => {
			expect(parseSchema({ body: { userId: 123 } })).containSubset({
				success: false,
			});
		});
	});

	describe("updateWalletByIdSchema", () => {
		const parseSchema = (data: Record<string, unknown>) => {
			return updateWalletByIdSchema.safeParse(data);
		};

		it("returns schema parse for valid input with all fields", () => {
			expect(
				parseSchema({
					params: { id: "123" },
					body: {
						funds: 500,
						isActive: true,
					},
				}),
			).toEqual({
				data: {
					params: { id: 123 },
					body: {
						funds: 500,
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
						funds: 500,
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
						funds: 500,
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
						funds: 500,
						isActive: true,
					},
				}),
			).containSubset({
				success: false,
			});
		});
	});
});
