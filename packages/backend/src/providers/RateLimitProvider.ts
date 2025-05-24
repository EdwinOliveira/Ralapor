import rateLimit from "express-rate-limit";

const RateLimitProvider = () => {
	return {
		createRateLimit: (
			refreshTime: number,
			maxRequestPerRefreshTime: number,
			hasStandardHeaders = true,
			hasLegacyHeaders = false,
		) =>
			rateLimit({
				windowMs: refreshTime,
				max: maxRequestPerRefreshTime,
				standardHeaders: hasStandardHeaders,
				legacyHeaders: hasLegacyHeaders,
			}),
	};
};

export { RateLimitProvider };
