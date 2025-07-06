import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

import { generateTripCacheKey, setJsonToRedis } from "@/utils/redis";

import type { CreateTripSchemaType } from "@/validations/trip.validations";

export const createTripService = async (payload: CreateTripSchemaType, userId: string) => {
    const trip = await prisma.trip.create({
        data: {
            title: payload.title,
            description: payload.description,
            startDate: payload.startDate,
            endDate: payload.endDate,
            userId,
        },
    });

    const key = generateTripCacheKey(trip.id);

    await redis.del(key);

    await setJsonToRedis(key, trip);
    return trip;
};
