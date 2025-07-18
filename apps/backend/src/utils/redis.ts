import { env } from "@/config/env.config";

import { redis } from "@/lib/redis";

import { logger } from "@/shared/logger";

export const setJsonToRedis = async <T>(key: string, value: T): Promise<void> => {
    try {
        await redis
            .multi()
            .set(key, JSON.stringify(value))
            .expire(key, env.REDIS_EXPIRATION)
            .exec();
    } catch (error) {
        logger.error(
            `Redis setJsonToRedis error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

export const getJsonFromRedis = async <T>(key: string): Promise<T | null> => {
    try {
        const value = await redis.get(key);
        if (!value) return null;
        return JSON.parse(value) as T;
    } catch (error) {
        logger.error(
            `Redis getJsonFromRedis parse error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
        return null;
    }
};

export const refreshRedisTTL = async (key: string): Promise<void> => {
    try {
        await redis.expire(key, env.REDIS_EXPIRATION);
    } catch (error) {
        logger.error(
            `Redis refreshRedisTTL error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

export const updateRedisListCache = async <T>(key: string, newItem: T): Promise<void> => {
    try {
        const cachedData = await getJsonFromRedis<T[]>(key);
        const updatedList = Array.isArray(cachedData) ? [newItem, ...cachedData] : [newItem];
        await setJsonToRedis<T[]>(key, updatedList);
    } catch (error) {
        logger.error(
            `Redis updateRedisListCache error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

export const updateSingleItemInRedisList = async <T extends { id: string }>(
    key: string,
    itemId: string,
    updatedItem: T
): Promise<void> => {
    try {
        const cachedList = await getJsonFromRedis<T[]>(key);
        if (!Array.isArray(cachedList)) {
            logger.debug(`No list to update in Redis for key: ${key}`);
            return;
        }
        const updatedList = cachedList.map((item) => (item.id === itemId ? updatedItem : item));
        await setJsonToRedis(key, updatedList);
    } catch (error) {
        logger.error(
            `Redis updateSingleItemInRedisList error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

export const removeFromRedisListCache = async <T extends { id: string }>(
    key: string,
    itemId: string
): Promise<void> => {
    try {
        const cachedList = await getJsonFromRedis<T[]>(key);
        if (!Array.isArray(cachedList)) {
            logger.debug(`No list to remove from in Redis for key: ${key}`);
            return;
        }
        const filteredList = cachedList.filter((item) => item.id !== itemId);
        await setJsonToRedis(key, filteredList);
    } catch (error) {
        logger.error(
            `Redis removeFromRedisListCache error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

export const findByIdFromRedisList = async <T extends { id: string }>(
    key: string,
    id: string
): Promise<T | null> => {
    try {
        const cachedList = await getJsonFromRedis<T[]>(key);
        if (!Array.isArray(cachedList)) return null;
        return cachedList.find((item) => item.id === id) ?? null;
    } catch (error) {
        logger.error(
            `Redis findByIdFromRedisList error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
        return null;
    }
};

// Key Generators
export const generateRefreshTokenKey = (userId: string): string => `refreshToken:${userId}`;
export const generateTripCacheKey = (userId: string): string => `trip:${userId}`;
export const generateLocationCacheKey = (tripId: string): string => `location:${tripId}`;
export const generatePlaceCacheKey = (): string => `place`;
