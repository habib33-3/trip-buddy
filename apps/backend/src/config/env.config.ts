/* eslint-disable no-process-env */
import "dotenv/config";
import ms, { type StringValue } from "ms";
import { z } from "zod";

import {
    DEFAULT_PORT,
    DEFAULT_RATE_LIMIT_WINDOW_MS,
    DEFAULT_REDIS_EXPIRATION,
    ENV_ENUM,
} from "@/shared/constants";
import { logger } from "@/shared/logger";

const envSchema = z.object({
    NODE_ENV: z.enum(ENV_ENUM).default("production"),
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    PORT: z.coerce.number().min(1).max(65535).default(DEFAULT_PORT),
    RATE_LIMIT_WINDOW_MS: z.coerce.number().min(1).default(DEFAULT_RATE_LIMIT_WINDOW_MS),

    DATABASE_URL: z.string().trim().url({ message: "DATABASE_URL must be a valid URL" }),

    REDIS_URL: z.string().trim().url({ message: "REDIS_URL must be a valid URL" }),

    ACCESS_TOKEN_SECRET: z
        .string()
        .trim()
        .min(1, { message: "ACCESS_TOKEN_SECRET cannot be empty" }),

    ACCESS_TOKEN_EXPIRATION: z
        .string()
        .trim()
        .transform((val, ctx) => {
            const result = ms(val as StringValue);
            if (typeof result !== "number") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "ACCESS_TOKEN_EXPIRATION must be a valid duration string like '1h', '7d', etc.",
                });
                return z.NEVER;
            }
            return result;
        }),

    REFRESH_TOKEN_SECRET: z
        .string()
        .trim()
        .min(1, { message: "REFRESH_TOKEN_SECRET cannot be empty" }),

    REFRESH_TOKEN_EXPIRATION: z
        .string()
        .trim()
        .transform((val, ctx) => {
            const result = ms(val as StringValue);
            if (typeof result !== "number") {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message:
                        "REFRESH_TOKEN_EXPIRATION must be a valid duration string like '1h', '7d', etc.",
                });
                return z.NEVER;
            }
            return result;
        }),

    REDIS_EXPIRATION: z
        .string()
        .trim()
        .regex(/^\d+$/, "Expiration must be a number")
        .transform(Number)
        .default(DEFAULT_REDIS_EXPIRATION),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    const formattedErrors = parsedEnv.error.errors
        .map((err) => `❌ ${err.path.join(".")}: ${err.message}`)
        .join("\n");

    logger.error(`❌ Invalid environment variables:\n${formattedErrors}`);
    throw new Error("Invalid environment variables. Exiting...");
}

export const env = parsedEnv.data;
export { envSchema };
