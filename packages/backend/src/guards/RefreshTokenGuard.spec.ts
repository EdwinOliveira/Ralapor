import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { NextFunction, Request, Response } from "express";
import { AccessTokenGuard } from "./AccessTokenGuard";

const tokenProviderMocks = {
	createToken: vi.fn(),
	checkToken: vi.fn(),
};

const request = {
	headers: {
		authorization: "Raw DummyToken",
	},
} as Request;

const response = {
	status: (status: number) => {
		response.statusCode = status;
		return { json: () => {} };
	},
} as Response;

const next = {} as NextFunction;

describe("RefreshTokenGuard", () => {
	beforeEach(() => {
		request.headers.authorization = "Raw DummyToken";

		vi.mock("./../providers/TokenProvider", () => ({
			TokenProvider: () => tokenProviderMocks,
		}));
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("should call TokenProvider.checkToken", () => {
		AccessTokenGuard(request, response, next);
		expect(tokenProviderMocks.checkToken).toBeCalled();
	});

	it("should navigate to the next middleware", () => {
		expect(AccessTokenGuard(request, response, next)).resolves.toBeUndefined();
	});

	it("should return 500 status code if the auth token is invalid ", () => {
		tokenProviderMocks.checkToken.mockRejectedValue(new Error("Invalid Token"));
		AccessTokenGuard(request, response, next);
		expect(response.statusCode).toEqual(500);
	});

	it("should return 401 status code if the auth token is missing", () => {
		request.headers.authorization = "";
		AccessTokenGuard(request, response, next);
		expect(response.statusCode).toEqual(401);
	});
});
