import Redis from "ioredis";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

declare global {
    var _redis: Redis | undefined;
}

const redisClient =
    global._redis ??
    new Redis(env.REDIS_URL, {
        maxRetriesPerRequest: null,
        enableReadyCheck: true,
        lazyConnect: false,
        reconnectOnError: (err) => {
            const targetMessages = ["READONLY", "ECONNRESET"];
            const shouldReconnect = targetMessages.some((msg) => err.message.includes(msg));
            if (shouldReconnect) {
                logger.info(`[Redis] Reconnecting due to error: ${err.message}`);
            }
            return shouldReconnect;
        },
    });

redisClient.on("connect", () => {
    logger.info("[Redis] Connected to Redis server");
});

redisClient.on("ready", () => {
    logger.info("[Redis] Redis client is ready to use");
});

redisClient.on("error", (err) => {
    logger.error(`[Redis] Error: ${err.message}`);
});

redisClient.on("close", () => {
    logger.info("[Redis] Connection closed");
});

redisClient.on("reconnecting", (delay: number) => {
    logger.info(`[Redis] Reconnecting in ${delay}ms...`);
});

if (env.NODE_ENV !== "production") global._redis = redisClient;

export const redis = redisClient;
