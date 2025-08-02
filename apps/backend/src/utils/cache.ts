import { env } from "@/config/env.config";

import { redis } from "@/lib/redis";

import { logger } from "@/shared/logger";

import { cacheKeyStats } from "./cache-key";

/**
 * Store a JSON-serializable value in Redis with TTL.
 */
export const cacheSet = async <T>(key: string, value: T): Promise<void> => {
    try {
        await redis
            .multi()
            .set(key, JSON.stringify(value))
            .expire(key, env.REDIS_EXPIRATION)
            .exec();
        logger.info(`Cache set: ${key}`);
    } catch (error) {
        logger.error(
            `Redis cacheSet error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

/**
 * Retrieve and parse JSON data from Redis.
 */
export const cacheGet = async <T>(key: string): Promise<T | null> => {
    try {
        const raw = await redis.get(key);
        if (raw) {
            logger.info(`Cache hit: ${key}`);
            return JSON.parse(raw) as T;
        }
        logger.info(`Cache miss: ${key}`);
        return null;
    } catch (error) {
        logger.error(
            `Redis cacheGet error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
        return null;
    }
};

/**
 * Refresh the expiration of a Redis key.
 */
export const cacheRefreshTTL = async (key: string): Promise<void> => {
    try {
        const ttl = Math.floor(env.REDIS_EXPIRATION / 3);

        const result = await redis.expire(key, ttl);
        logger.info(`Cache TTL refreshed [${key}]: ${result ? "success" : "failed"}`);
    } catch (error) {
        logger.error(
            `Redis cacheRefreshTTL error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

/**
 * Remove a Redis key to invalidate the cache.
 */
export const cacheInvalidate = async (key: string): Promise<void> => {
    try {
        await redis.del(key);
        logger.info(`Cache invalidated: ${key}`);
    } catch (error) {
        logger.error(
            `Redis cacheInvalidate error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

/**
 * Add an item to the beginning of a list stored in Redis.
 */
export const cacheListPrepend = async <T>(key: string, newItem: T): Promise<void> => {
    try {
        const list = await cacheGet<T[]>(key);
        const updated = Array.isArray(list) ? [newItem, ...list] : [newItem];
        await cacheSet<T[]>(key, updated);
        logger.info(`Item prepended to cache list: ${key}`);
    } catch (error) {
        logger.error(
            `Redis cacheListPrepend error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

/**
 * Update an item in a Redis list by its ID.
 */
export const cacheListUpdateItem = async <T extends { id: string }>(
    key: string,
    id: string,
    updatedItem: T
): Promise<void> => {
    try {
        const list = await cacheGet<T[]>(key);
        if (!Array.isArray(list)) return;
        const updatedList = list.map((item) => (item.id === id ? updatedItem : item));
        await cacheSet<T[]>(key, updatedList);
        logger.info(`Item updated in cache list: ${key}, id: ${id}`);
    } catch (error) {
        logger.error(
            `Redis cacheListUpdateItem error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

/**
 * Remove an item from a Redis list by its ID.
 */
export const cacheListRemoveItem = async <T extends { id: string }>(
    key: string,
    id: string
): Promise<void> => {
    try {
        const list = await cacheGet<T[]>(key);
        if (!Array.isArray(list)) return;
        const filtered = list.filter((item) => item.id !== id);
        await cacheSet<T[]>(key, filtered);
        logger.info(`Item removed from cache list: ${key}, id: ${id}`);
    } catch (error) {
        logger.error(
            `Redis cacheListRemoveItem error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
    }
};

/**
 * Find an item in a Redis list by its ID.
 */
export const cacheListFindById = async <T extends { id: string }>(
    key: string,
    id: string
): Promise<T | null> => {
    try {
        const list = await cacheGet<T[]>(key);
        if (!Array.isArray(list)) {
            logger.info(`Cache miss (list not found or invalid): ${key}`);
            return null;
        }
        const found = list.find((item) => item.id === id) ?? null;
        logger.info(`Cache ${found ? "hit" : "miss"} for item id: ${id} in list: ${key}`);
        return found;
    } catch (error) {
        logger.error(
            `Redis cacheListFindById error [${key}]: ${error instanceof Error ? error.message : String(error)}`
        );
        return null;
    }
};

export const invalidateStatsCache = async (userId: string) => {
    const statsKey = cacheKeyStats(userId);

    await cacheInvalidate(statsKey);
};
