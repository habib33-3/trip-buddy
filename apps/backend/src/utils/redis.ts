import { env } from "@/config/env.config";

import { redis } from "@/lib/redis";

export const setJsonToRedis = async (key: string, value: object) => {
    await redis.set(key, JSON.stringify(value), "EX", env.REDIS_EXPIRATION);
};

export const generateRefreshTokenKey = (userId: string) => {
    return `refreshToken:${userId}`;
};

export const generateTripCacheKey = (tripId: string) => `trip:${tripId}`;
