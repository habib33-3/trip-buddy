import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

import { PrismaClient } from "@/generated/prisma";

const isProd = env.NODE_ENV === "production";

export const prisma = new PrismaClient({
    log: isProd
        ? []
        : [
              { emit: "event", level: "query" },
              { emit: "event", level: "info" },
              { emit: "event", level: "warn" },
              { emit: "event", level: "error" },
          ],
});

if (!isProd) {
    prisma.$on("query", (e) => {
        logger.info(`[PRISMA][QUERY] ${e.query}`);
        logger.debug(`[PRISMA][PARAMS] ${e.params}`);
        logger.debug(`[PRISMA][DURATION] ${e.duration}ms`);
    });

    prisma.$on("info", (e) => {
        logger.info(`[PRISMA][INFO] ${e.message}`);
    });

    prisma.$on("warn", (e) => {
        logger.warn(`[PRISMA][WARN] ${e.message}`);
    });

    prisma.$on("error", (e) => {
        logger.error(`[PRISMA][ERROR] ${e.message}`);
    });
} else {
    prisma.$on("error", (e) => {
        logger.error(`[PRISMA][ERROR] ${e.message}`);
    });
    prisma.$on("warn", (e) => {
        logger.warn(`[PRISMA][WARN] ${e.message}`);
    });
}

export const shutDownPrisma = async (): Promise<void> => {
    try {
        await prisma.$disconnect();
        logger.info("[PRISMA] 🔌 Prisma disconnected successfully.");
    } catch (error) {
        const errMsg = error instanceof Error ? error.message : String(error);
        logger.error(`[PRISMA] ❌ Error during disconnection: ${errMsg}`);

        if (!isProd) throw error;
    }
};
