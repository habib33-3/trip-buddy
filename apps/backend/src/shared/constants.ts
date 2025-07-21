/* eslint-disable @typescript-eslint/no-magic-numbers */

export const DEFAULT_PORT = 5000;

export const DEFAULT_RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

export const ACCESS_TOKEN_COOKIE_NAME = "trip-buddy-access-token";

export const REFRESH_TOKEN_COOKIE_NAME = "trip-buddy-refresh-token";

export const ENV_ENUM = ["development", "test", "production"] as const;

export const tokenTypes = ["access_token", "refresh_token"] as const;

export type TokenTypes = (typeof tokenTypes)[number];

export const DEFAULT_REDIS_EXPIRATION = "3600";

export const CACHE_TTL_SECONDS = 60 * 60 * 24;

export const DEFAULT_REDIS_KEY_PREFIX = "trip-buddy-redis";
