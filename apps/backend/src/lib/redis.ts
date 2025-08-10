import Redis from "ioredis";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

declare global {
    var _redis: Redis | undefined;
}

const isProd = env.NODE_ENV === "production";

const redisClient =
    global._redis ??
    new Redis(env.REDIS_URL, {
        enableReadyCheck: true,
        lazyConnect: false,
        maxRetriesPerRequest: null,
        reconnectOnError: (err) => {
            const msg = err.message.toUpperCase();
            const shouldReconnect = msg.includes("READONLY") || msg.includes("ECONNRESET");

            if (shouldReconnect && !isProd) {
                logger.info(`[Redis] Reconnecting due to error: ${err.message}`);
            }

            return shouldReconnect;
        },
    });

if (!isProd) {
    redisClient.on("connect", () => {
        logger.info("[Redis] Connected to Redis server");
    });

    redisClient.on("ready", () => {
        logger.info("[Redis] Redis client is ready to use");
    });

    redisClient.on("reconnecting", (delay: number) => {
        logger.info(`[Redis] Reconnecting in ${delay}ms...`);
    });
} else {
    redisClient.on("connect", () => {
        logger.info("[Redis] Connected");
    });
}

redisClient.on("error", (err) => {
    logger.error(`[Redis] Error: ${err.message}`);
});

redisClient.on("close", () => {
    logger.info("[Redis] Connection closed");
});

export const shutDownRedis = async (): Promise<void> => {
    try {
        await redisClient.quit();
        logger.info("[Redis] 🔌 Redis disconnected successfully.");
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        logger.error(`[Redis] ❌ Error during disconnection: ${errMsg}`);
        if (!isProd) throw error;
    }
};

if (!isProd) global._redis = redisClient;

export const redis = redisClient;
