import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import {
    cacheGet,
    cacheInvalidate,
    cacheListFindById,
    cacheListPrepend,
    cacheListRemoveItem,
    cacheListUpdateItem,
    cacheRefreshTTL,
    cacheSet,
} from "@/utils/redis";
import { cacheKeyStats, cacheKeyTrip } from "@/utils/redis-key";

import ApiError from "@/shared/ApiError";
import { logger } from "@/shared/logger";

import type { CreateTripSchemaType, UpdateTripSchemaType } from "@/validations/trip.validations";

import type { Trip } from "@/generated/prisma";

export const getTripById = async (
    key: string,
    tripId: string,
    userId: string
): Promise<Trip | null> => {
    const cachedTrip = await cacheListFindById<Trip>(key, tripId);
    if (cachedTrip) return cachedTrip;

    const trip = await prisma.trip.findFirst({
        include: { itineraries: true },
        where: { id: tripId, userId },
    });

    if (trip) {
        await cacheListPrepend<Trip>(key, trip);
    }

    return trip;
};

/**
 * Create a new trip and cache it.
 */
export const createTripService = async (
    payload: CreateTripSchemaType,
    userId: string
): Promise<Trip> => {
    const trip = await prisma.trip.create({
        data: {
            description: payload.description,
            endDate: payload.endDate,
            startDate: payload.startDate,
            title: payload.title,
            userId,
        },
        include: { itineraries: true },
    });

    const key = cacheKeyTrip(userId);
    await cacheListPrepend<Trip>(key, trip);

    const statsKey = cacheKeyStats(userId);

    await cacheInvalidate(statsKey);

    return trip;
};

/**
 * Get all trips for a user with Redis caching.
 */
export const getAllTripsService = async (userId: string): Promise<Trip[]> => {
    const key = cacheKeyTrip(userId);
    const cachedTrips = await cacheGet<Trip[]>(key);

    if (cachedTrips?.length) {
        logger.info(`Cache hit: ${key}`);
        await cacheRefreshTTL(key);
        return cachedTrips;
    }

    logger.info(`Cache miss: ${key}`);
    const trips = await prisma.trip.findMany({ where: { userId } });

    if (trips.length > 0) {
        await cacheSet<Trip[]>(key, trips);
    }

    return trips;
};

/**
 * Get a single trip by ID for a user.
 */
export const getSingleTripService = async (
    tripId: string,
    userId: string
): Promise<Trip | null> => {
    const key = cacheKeyTrip(userId);
    return getTripById(key, tripId, userId);
};

/**
 * Update a trip and sync it in Redis.
 */
export const updateTripService = async (
    tripId: string,
    payload: UpdateTripSchemaType,
    userId: string
): Promise<Trip> => {
    const key = cacheKeyTrip(userId);
    const existingTrip = await getTripById(key, tripId, userId);

    if (!existingTrip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    const updatedTrip = await prisma.trip.update({
        data: { ...payload },
        where: { id: tripId, userId },
    });

    await cacheListUpdateItem<Trip>(key, tripId, updatedTrip);

    // Optional: Refresh TTL on the trip list cache
    await cacheRefreshTTL(key);

    return updatedTrip;
};

/**
 * Delete a trip and remove it from Redis.
 */
export const deleteTripService = async (
    tripId: string,
    userId: string
): Promise<{ success: true }> => {
    const key = cacheKeyTrip(userId);
    const existingTrip = await getTripById(key, tripId, userId);

    if (!existingTrip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    await prisma.trip.delete({
        where: { id: tripId, userId },
    });

    await cacheListRemoveItem<Trip>(key, tripId);

    const statsKey = cacheKeyStats(userId);

    await cacheInvalidate(key);

    await cacheInvalidate(statsKey);

    return { success: true };
};
