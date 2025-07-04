import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
    prisma?: PrismaClient;
};

const createPrismaClient = () =>
    new PrismaClient({
        log:
            env.NODE_ENV === "development"
                ? [
                      { emit: "event", level: "query" },
                      { emit: "event", level: "error" },
                      { emit: "event", level: "warn" },
                  ]
                : [{ emit: "event", level: "error" }],
    });

export const prisma =
    globalForPrisma.prisma ??
    (() => {
        const client = createPrismaClient();

        client
            .$connect()
            .then(() => logger.info("✅ Prisma connected"))
            .catch((err) => logger.error(`❌ Prisma failed to connect: ${err}`));

        if (env.NODE_ENV === "development") {
            client.$on("query", (e) =>
                logger.info(
                    `[Prisma Query] ${e.query} - Params: ${e.params} - Duration: ${e.duration}ms`
                )
            );
            client.$on("warn", (e) => logger.warn(`[Prisma Warning] ${e.message}`));
        }

        client.$on("error", (e) => logger.error(`[Prisma Error] ${e.message}`));

        return client;
    })();

if (env.NODE_ENV === "development") {
    globalForPrisma.prisma = prisma;
}
