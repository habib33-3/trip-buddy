import { PrismaClient } from "@prisma/client";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

const disconnectPrisma = async () => {
    try {
        await prisma.$disconnect();
        logger.info("🔌 Prisma disconnected gracefully.");
    } catch (error) {
        logger.error(`⚠️ Error during Prisma disconnect: ${error}`);
    }
};

export { prisma, disconnectPrisma };
