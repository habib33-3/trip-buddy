import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import {
    findByIdFromRedisList,
    generateTripCacheKey,
    getJsonFromRedis,
    refreshRedisTTL,
    removeFromRedisListCache,
    setJsonToRedis,
    updateRedisListCache,
    updateSingleItemInRedisList,
} from "@/utils/redis";

import ApiError from "@/shared/ApiError";
import { logger } from "@/shared/logger";

import type { CreateTripSchemaType, UpdateTripSchemaType } from "@/validations/trip.validations";

import type { Trip } from "@/generated/prisma";

const getTripById = async (key: string, tripId: string, userId: string): Promise<Trip | null> => {
    const trip = await findByIdFromRedisList<Trip>(key, tripId);

    if (!trip) {
        logger.info(`Cache miss: ${key}`);
        return prisma.trip.findUnique({ where: { id: tripId, userId } });
    }

    return trip;
};

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

    const cachedTrips = await getJsonFromRedis<Trip[]>(key);

    if (cachedTrips?.length) {
        logger.info(`Cache hit: ${key}`);
        await refreshRedisTTL(key);
        return cachedTrips;
    }

    logger.info(`Cache miss: ${key}`);
    const trips = await prisma.trip.findMany({ where: { userId } });

    if (trips.length) {
        await setJsonToRedis(key, trips);
    }

    return trips;
};

export const getSingleTripService = async (tripId: string, userId: string) => {
    const key = generateTripCacheKey(userId);

    return getTripById(key, tripId, userId);
};

export const updateTripService = async (
    tripId: string,
    payload: UpdateTripSchemaType,
    userId: string
) => {
    const key = generateTripCacheKey(userId);
    const trip = await getTripById(key, tripId, userId);

    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    const updatedTrip = await prisma.trip.update({
        where: { id: tripId, userId },
        data: { ...payload },
    });

    await updateSingleItemInRedisList<Trip>(key, tripId, updatedTrip);

    return updatedTrip;
};

export const deleteTripService = async (tripId: string, userId: string) => {
    const key = generateTripCacheKey(userId);

    const trip = await getTripById(key, tripId, userId);

    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    await prisma.trip.delete({
        where: { id: tripId, userId },
    });

    await removeFromRedisListCache(key, tripId);
    return { success: true };
};
