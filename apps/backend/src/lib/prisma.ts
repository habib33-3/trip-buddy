import { logger } from "@/shared/logger";

import { PrismaClient } from "@/generated/prisma";

// --- Prisma Instance ---
export const prisma = new PrismaClient({
    log: [
        { emit: "event", level: "query" },
        { emit: "event", level: "info" },
        { emit: "event", level: "warn" },
        { emit: "event", level: "error" },
    ],
});

// --- Event Listeners ---
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

// --- Graceful Shutdown ---
export const shutDownPrisma = async (): Promise<void> => {
    try {
        await prisma.$disconnect();
        logger.info("[PRISMA] 🔌 Prisma disconnected successfully.");
    } catch (error) {
        const err = error instanceof Error ? error.message : String(error);
        logger.error(`[PRISMA] ❌ Error during disconnection: ${err}`);

        throw err;
    }
};
