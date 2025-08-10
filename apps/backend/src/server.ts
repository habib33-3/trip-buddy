/* eslint-disable n/no-process-exit */
import app from "./app/app";
import { env } from "./config/env.config";
import { prisma, shutDownPrisma } from "./lib/prisma";
import { redis, shutDownRedis } from "./lib/redis";
import { logger } from "./shared/logger";

const isTest = env.NODE_ENV === "test";

let server: ReturnType<typeof app.listen> | undefined;

async function startServer() {
    try {
        await prisma.$connect();
        logger.info("[Startup] ✅ Prisma connected.");

        if (redis.status === "end" || redis.status === "wait") {
            await redis.connect();
            logger.info("[Startup] ✅ Redis connected.");
        }

        server = app.listen(env.PORT, () => {
            logger.info(`[Startup] 🚀 Server is running on port ${env.PORT}`);
        });
    } catch (error) {
        logger.error(`[Startup] ❌ Failed to start server: ${String(error)}`);
        await shutdown(error);
    }
}

const shutdown = async (startupError?: unknown) => {
    logger.info("[Shutdown] 🧹 Graceful shutdown started...");
    try {
        if (server) {
            await Promise.race([
                new Promise<void>((resolve, reject) => {
                    server?.close((err) => (err ? reject(err) : resolve()));
                }),
                new Promise<void>((_, reject) =>
                    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
                    setTimeout(() => reject(new Error("Shutdown timeout")), 10_000)
                ),
            ]);
            logger.info("[Shutdown] ✅ HTTP server closed.");
        }

        await shutDownPrisma();
        await shutDownRedis();
    } catch (error) {
        const shutdownError =
            error instanceof Error ? (error.stack ?? error.message) : String(error);
        logger.error(`[Shutdown] 💥 Error: ${shutdownError}`);
    } finally {
        if (!isTest) {
            process.exit(startupError ? 1 : 0);
        }
    }
};

process.on("SIGINT", () => {
    logger.info("[Signal] 📡 SIGINT received.");
    shutdown().catch((error) => logger.error(`[Shutdown] ${String(error)}`));
});

process.on("SIGTERM", () => {
    logger.info("[Signal] 📡 SIGTERM received.");
    shutdown().catch((error) => logger.error(`[Shutdown] ${String(error)}`));
});

process.on("uncaughtException", (error) => {
    logger.error(
        `[Error] 🔥 Uncaught Exception: ${
            error instanceof Error ? (error.stack ?? error.message) : String(error)
        }`
    );
    shutdown(error).catch((err) => logger.error(`[Shutdown] ${String(err)}`));
});

process.on("unhandledRejection", (reason) => {
    logger.error(`[Error] 💡 Unhandled Promise Rejection: ${String(reason)}`);
    shutdown(reason).catch((err) => logger.error(`[Shutdown] ${String(err)}`));
});

startServer().catch(async (error) => shutdown(error));
