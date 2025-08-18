import "dotenv/config";
import Redis from "ioredis";

import { PrismaClient } from "../src/generated/prisma";
import { logger } from "../src/shared/logger";

const prisma = new PrismaClient();

const resetPrisma = async () => {
    logger.info("🗑️ Resetting Prisma DB...");
    try {
        await prisma.$transaction([
            prisma.itinerary.deleteMany(),
            prisma.trip.deleteMany(),
            prisma.place.deleteMany(),
            prisma.user.deleteMany(),
        ]);
        logger.info("✅ Prisma DB reset successfully.");
    } catch (error) {
        logger.error(
            `❌ Failed to reset Prisma DB: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
    }
};

const resetRedis = async () => {
    logger.info("🗑️ Resetting Redis...");
    const redis = new Redis();

    try {
        const rawPrefix = `${process.env.APP_NAME}-cache`;

        if (process.env.NODE_ENV !== "production") {
            logger.debug(`🧹 Redis prefix: ${rawPrefix}`);
        }

        const prefix = `${encodeURIComponent(rawPrefix)}:*`;
        const keys = await redis.keys(prefix);

        if (keys.length > 0) {
            await redis.del(...keys);
            logger.info(`✅ Deleted ${keys.length} Redis keys.`);
            if (process.env.NODE_ENV !== "production") {
                logger.debug(`🧹 Deleted keys:\n${keys.map((k) => `- ${k}`).join("\n")}`);
            }
        } else {
            logger.info("ℹ️ No Redis keys to delete.");
        }
    } catch (error) {
        logger.error(
            `❌ Failed to reset Redis: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
    } finally {
        await redis.quit();
    }
};

export const resetDBData = async () => {
    if (process.env.NODE_ENV === "production" && process.env.ALLOW_DB_RESET !== "true") {
        logger.warn(
            "❌ DB reset is not allowed in production. Set ALLOW_DB_RESET=true to override."
        );
        throw new Error("DB reset not allowed in production");
    }

    try {
        logger.info("🚀 Starting database reset...");
        await resetPrisma();
        await resetRedis();
        logger.info("✅ Database reset completed.");
    } catch (error) {
        logger.error(
            `❌ Database reset failed: ${error instanceof Error ? error.message : String(error)}`
        );
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};

if (require.main === module) {
    resetDBData()
        .then(() => process.exit(0))
        .catch((error) => {
            logger.error(`❌ Database reset failed: ${String(error)}`);
            process.exit(1);
        });
}
