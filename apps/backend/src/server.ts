/* eslint-disable n/no-process-exit */
import app from "./app/app";
import { env } from "./config/env.config";
import { prisma, shutDownPrisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { logger } from "./shared/logger";

let server: ReturnType<typeof app.listen>;

async function startServer() {
    try {
        await prisma.$connect();
        logger.info("✅ Prisma connected.");

        await redis.connect();
        logger.info("✅ Redis connected.");

        server = app.listen(env.PORT, () => {
            logger.info(`🚀 Server is running on port ${env.PORT}`);
        });
    } catch (error) {
        logger.error(`❌ Failed to start server: ${String(error)}`);
        await shutdown(error);
    }
}

const shutdown = async (startupError?: unknown) => {
    logger.info("🧹 Graceful shutdown started...");
    try {
        await Promise.race([
            new Promise<void>((resolve, reject) => {
                server.close((err) => (err ? reject(err) : resolve()));
            }),
            new Promise<void>((_, reject) =>
                // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                setTimeout(() => reject(new Error("Shutdown timeout")), 10_000)
            ),
        ]);
        logger.info("✅ HTTP server closed.");

        await shutDownPrisma();

        await redis.quit();
        logger.info("✅ Redis disconnected.");
    } catch (error) {
        const shutdownError =
            error instanceof Error ? (error.stack ?? error.message) : String(error);
        logger.error(`💥 Shutdown error: ${shutdownError}`);
    } finally {
        process.exit(startupError ? 1 : 0);
    }
};

process.on("SIGINT", () => {
    logger.info("📡 SIGINT received.");
    shutdown().catch((error) => {
        logger.error(`Shutdown error: ${String(error)}`);
    });
});

process.on("SIGTERM", () => {
    logger.info("📡 SIGTERM received.");
    shutdown().catch((error) => {
        logger.error(`Shutdown error: ${String(error)}`);
    });
});

process.on("uncaughtException", (error) => {
    logger.error(
        `🔥 Uncaught Exception: ${error instanceof Error ? (error.stack ?? error.message) : String(error)}`
    );
    shutdown(error).catch((shutdownError) => {
        logger.error(`Shutdown error: ${String(shutdownError)}`);
    });
});

process.on("unhandledRejection", (reason) => {
    logger.error(`💡 Unhandled Promise Rejection: ${String(reason)}`);
    shutdown(reason).catch((shutdownError) => {
        logger.error(`Shutdown error: ${String(shutdownError)}`);
    });
});

startServer().catch(async (error) => shutdown(error));
