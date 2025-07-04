import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import ApiError from "@/shared/ApiError";
import { logger } from "@/shared/logger";

import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

const createPrismaClient = () =>
    new PrismaClient({
        log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : [],
    });

export const prisma =
    globalForPrisma.prisma ??
    (() => {
        const client = createPrismaClient();

        if (env.NODE_ENV === "production") {
            client
                .$connect()
                .then(() => logger.info("✅ Prisma connected"))
                .catch((err) => {
                    logger.error(`❌ Prisma failed to connect:, ${err}`);
                    // Log error but don't throw to prevent startup crash
                    // Let individual operations handle connection errors
                });
        }

        return client;
    })();

if (env.NODE_ENV === "development") {
    globalForPrisma.prisma = prisma;
}
