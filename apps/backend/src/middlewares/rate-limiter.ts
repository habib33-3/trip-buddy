import type { Request, Response } from "express";

import rateLimit from "express-rate-limit";

import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

// Rate limiter configuration
const limiter = rateLimit({
    // Custom response when the limit is exceeded
    handler: (req: Request, res: Response) => {
        logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
        res.status(StatusCodes.TOO_MANY_REQUESTS).json({
            error: "Rate limit exceeded",
            message: "Too many requests, please try again later.",
        });
    },
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    max: 100, // Limit each IP to 100 requests per `window` (15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers

    windowMs: env.RATE_LIMIT_WINDOW_MS,
});

export default limiter;
