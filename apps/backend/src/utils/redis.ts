import { env } from "@/config/env.config";

import { redis } from "@/lib/redis";

export const setJsonToRedis = async (key: string, value: object) => {
    await redis.set(key, JSON.stringify(value), "EX", env.REDIS_EXPIRATION);
};

export const getJsonFromRedis = async (key: string) => {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
};

export const updateRedisListCache = async <T>(key: string, newItem: T): Promise<void> => {
    const cachedData = await getJsonFromRedis(key);

    if (Array.isArray(cachedData)) {
        await setJsonToRedis(key, [newItem, ...cachedData]);
    } else {
        await setJsonToRedis(key, [newItem]);
    }
};

export const generateRefreshTokenKey = (userId: string) => `refreshToken:${userId}`;

export const generateTripCacheKey = (userId: string) => `trip:${userId}`;
