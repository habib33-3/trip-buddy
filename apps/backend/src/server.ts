/* eslint-disable no-process-exit */
/* eslint-disable n/no-process-exit */
import app from "./app/app";
import { env } from "./config/env.config";
import { prisma } from "./lib/prisma";
import { redis } from "./lib/redis";
import { logger } from "./shared/logger";

let server: ReturnType<typeof app.listen>;

async function startServer() {
    try {
        server = app.listen(env.PORT, () => {
            logger.info(`🚀 Server is running on port ${env.PORT}`);
        });
    } catch (error) {
        logger.error(`❌ Failed to start server: ${error}`);
        await shutdown();
    }
}

const shutdown = async () => {
    logger.info("🧹 Graceful shutdown started...");
    try {
        if (server) {
            await Promise.race([
                new Promise<void>((resolve, reject) => {
                    server.close((err) => (err ? reject(err) : resolve()));
                }),

                new Promise<void>((_, reject) =>
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    setTimeout(() => reject(new Error("Shutdown timeout")), 10000)
                ), // 10s timeout
            ]);
            logger.info("✅ HTTP server closed.");
        }
        await prisma.$disconnect();

        logger.info("✅ Prisma disconnected.");

        if (redis?.disconnect) {
            redis.disconnect();
            logger.info("✅ Redis disconnected.");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        logger.error(`💥 Shutdown error: ${error.stack || error}`);
    } finally {
        process.exit(0);
    }
};

process.on("SIGINT", () => {
    logger.info("📡 SIGINT received.");

    shutdown().catch((error) => {
        logger.error(`Shutdown error: ${error}`);
    });
});

process.on("SIGTERM", () => {
    logger.info("📡 SIGTERM received.");

    shutdown().catch((error) => {
        logger.error(`Shutdown error: ${error}`);
    });
});

process.on("uncaughtException", (error) => {
    logger.error(`🔥 Uncaught Exception: ${error}`);

    shutdown().catch((shutdownError) => {
        logger.error(`Shutdown error: ${shutdownError}`);
    });
});

process.on("unhandledRejection", (reason) => {
    logger.error(`💡 Unhandled Promise Rejection: ${reason}`);

    shutdown().catch((shutdownError) => {
        logger.error(`Shutdown error: ${shutdownError}`);
    });
});

// Start server and handle fatal errors during startup
startServer().catch(async (error) => {
    logger.error(`❌ Fatal error during startup: ${error}`);

    await shutdown();
});
