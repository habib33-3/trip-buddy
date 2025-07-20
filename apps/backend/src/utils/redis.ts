import { env } from "@/config/env.config";

import { redis } from "@/lib/redis";

import { logger } from "@/shared/logger";

/**
 * Set a JSON object to Redis with expiration.
 *
 * @template T - Type of the value to store.
 * @param {string} key - The Redis key.
 * @param {T} value - The value to store.
 * @returns {Promise<void>}
 */
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

/**
 * Get a JSON-parsed value from Redis.
 *
 * @template T - Expected return type.
 * @param {string} key - The Redis key.
 * @returns {Promise<T | null>} - Parsed value or null if not found.
 */
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

/**
 * Refresh the expiration time of a Redis key.
 *
 * @param {string} key - The Redis key.
 * @returns {Promise<void>}
 */
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

/**
 * Add a new item to the beginning of a cached list in Redis.
 *
 * @template T - Type of the item.
 * @param {string} key - The Redis key.
 * @param {T} newItem - The new item to add.
 * @returns {Promise<void>}
 */
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

/**
 * Delete a Redis key to invalidate the cache.
 *
 * @param {string} key - The Redis key to delete.
 * @returns {Promise<void>}
 */
export const invalidateRedisCache = async (key: string): Promise<void> => {
    try {
        await redis.del(key);
        logger.info(`Redis cache invalidated for key: ${key}`);
    } catch (error) {
        logger.error(
            `Redis invalidateRedisCache error for key: ${key}, ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};

/**
 * Update an item in a cached list in Redis by its ID.
 *
 * @template T - Type of the item (must include `id` field).
 * @param {string} key - The Redis key.
 * @param {string} itemId - The ID of the item to update.
 * @param {T} updatedItem - The updated item.
 * @returns {Promise<void>}
 */
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

/**
 * Remove an item from a cached list in Redis by its ID.
 *
 * @template T - Type of the item (must include `id` field).
 * @param {string} key - The Redis key.
 * @param {string} itemId - The ID of the item to remove.
 * @returns {Promise<void>}
 */
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

/**
 * Find an item in a cached list in Redis by its ID.
 *
 * @template T - Type of the item (must include `id` field).
 * @param {string} key - The Redis key.
 * @param {string} id - The ID to search for.
 * @returns {Promise<T | null>} - The found item or null.
 */
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

export const generateRefreshTokenKey = (userId: string): string => `refreshToken:${userId}`;
export const generateTripCacheKey = (userId: string): string => `trip:${userId}`;
export const generateItineraryCacheKey = (userId: string, tripId: string): string =>
    `itinerary:${userId}:${tripId}`;
