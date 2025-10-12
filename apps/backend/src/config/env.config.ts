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

    ACCESS_TOKEN_SECRET: z
        .string()
        .trim()
        .min(1, { message: "ACCESS_TOKEN_SECRET cannot be empty" }),
    ALLOWED_CORS_ORIGIN: z
        .string()
        .transform((val) => val.split(",").map((origin) => origin.trim().replace(/^"(.*)"$/, "$1")))
        .refine((arr) => arr.length > 0, {
            message: "ALLOWED_CORS_ORIGIN must have at least one origin",
        }),
    APP_EMAIL: z
        .string()
        .trim()
        .email("APP_EMAIL must be a valid e-mail address")
        .default("no-reply@example.com"),

    APP_NAME: z
        .string()
        .trim()
        .min(1, { message: "APP_NAME cannot be empty" })
        .default("Express API Template"),
    CLOUDINARY_API_KEY: z.string().trim().min(1, { message: "CLOUDINARY_API_KEY cannot be empty" }),

    CLOUDINARY_CLOUD_NAME: z
        .string()
        .trim()
        .min(1, { message: "CLOUDINARY_CLOUD_NAME cannot be empty" }),
    CLOUDINARY_SECRET_KEY: z
        .string()
        .trim()
        .min(1, { message: "CLOUDINARY_SECRET_KEY cannot be empty" }),
    DATABASE_URL: z.string().trim().url({ message: "DATABASE_URL must be a valid URL" }),
    HASH_SECRET_PEPPER: z.string().min(1, { message: "HASH_SECRET_PEPPER cannot be empty" }),

    NODE_ENV: z.enum(ENV_ENUM).default("production"),

    PORT: z.coerce.number().min(1).max(65535).default(DEFAULT_PORT),

    RATE_LIMIT_WINDOW_MS: z.coerce.number().min(1).default(DEFAULT_RATE_LIMIT_WINDOW_MS),

    REDIS_EXPIRATION: z
        .string()
        .trim()
        .regex(/^\d+$/, "Expiration must be a number")
        .transform(Number)
        .default(DEFAULT_REDIS_EXPIRATION),

    REDIS_URL: z.string().trim().url({ message: "REDIS_URL must be a valid URL" }),

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

    REFRESH_TOKEN_SECRET: z
        .string()
        .trim()
        .min(1, { message: "REFRESH_TOKEN_SECRET cannot be empty" }),
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
