import { prisma } from "@/lib/prisma";

import {
    generateTripCacheKey,
    getJsonFromRedis,
    setJsonToRedis,
    updateRedisListCache,
} from "@/utils/redis";

import type { CreateTripSchemaType } from "@/validations/trip.validations";

import type { Trip } from "@/generated/prisma";

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

    const key = generateTripCacheKey(userId);

    await updateRedisListCache<Trip>(key, trip);

    return trip;
};

export const getAllTripsService = async (userId: string) => {
    const key = generateTripCacheKey(userId);

    const cachedTrips = await getJsonFromRedis(key);
    if (cachedTrips) return cachedTrips as Trip[];

    const trips = await prisma.trip.findMany({ where: { userId } });
    if (trips.length > 0) {
        await setJsonToRedis(key, trips);
    }

    return trips;
};
