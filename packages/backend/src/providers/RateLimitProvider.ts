import rateLimit from 'express-rate-limit';

const RateLimitProvider = () => {
  return {
    createRateLimit: (
      refreshTime: number,
      maxRequestPerRefreshTime: number,
      hasStandardHeaders = true,
      hasLegacyHeaders = false
    ) =>
      rateLimit({
        legacyHeaders: hasLegacyHeaders,
        max: maxRequestPerRefreshTime,
        standardHeaders: hasStandardHeaders,
        windowMs: refreshTime,
      }),
  };
};

export { RateLimitProvider };
