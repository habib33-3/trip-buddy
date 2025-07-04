import Redis from "ioredis";

import { env } from "@/config/env.config";

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
            return targetMessages.some((msg) => err.message.includes(msg));
        },
    });

if (env.NODE_ENV !== "production") global._redis = redisClient;

export const redis = redisClient;
