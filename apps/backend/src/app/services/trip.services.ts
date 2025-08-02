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
    invalidateStatsCache,
} from "@/utils/cache";
import { cacheKeyTrip } from "@/utils/cache-key";

import ApiError from "@/shared/ApiError";

import type {
    ChangeTripStatusSchemaType,
    CreateTripSchemaType,
    SearchTripParamSchemaType,
    UpdateTripSchemaType,
} from "@/validations/trip.validations";

import type { Trip } from "@/generated/prisma";

export const getTripById = async (tripId: string, userId: string): Promise<Trip | null> => {
    const key = cacheKeyTrip(userId);

    const cachedTrip = await cacheListFindById<Trip>(key, tripId);
    if (cachedTrip) {
        await cacheRefreshTTL(key);
        return cachedTrip;
    }

    const trip = await prisma.trip.findFirst({
        include: { itineraries: true },
        where: { id: tripId, userId },
    });

    if (trip) {
        await cacheListPrepend<Trip>(key, trip);
    }

    return trip;
};

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

    await invalidateStatsCache(userId);

    return trip;
};

export const getAllTripsService = async (
    userId: string,
    searchTripParams: SearchTripParamSchemaType
): Promise<Trip[]> => {
    const key = cacheKeyTrip(userId, searchTripParams);

    const cachedTrips = await cacheGet<Trip[]>(key);

    if (cachedTrips !== null) {
        await cacheRefreshTTL(key);
        return cachedTrips;
    }

    const { searchQuery = "", status } = searchTripParams;

    const trips = await prisma.trip.findMany({
        where: {
            ...(searchQuery && {
                OR: [
                    {
                        title: {
                            contains: searchQuery,
                            mode: "insensitive",
                        },
                    },
                    {
                        description: {
                            contains: searchQuery,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
            ...(status.length > 0 && {
                status: {
                    in: status,
                },
            }),
            userId,
        },
    });

    if (trips.length > 0) {
        await cacheSet(key, trips);
    }

    return trips;
};

export const getSingleTripService = async (
    tripId: string,
    userId: string
): Promise<Trip | null> => {
    return getTripById(tripId, userId);
};

export const updateTripService = async (
    tripId: string,
    payload: UpdateTripSchemaType,
    userId: string
): Promise<Trip> => {
    const key = cacheKeyTrip(userId);
    const existingTrip = await getTripById(tripId, userId);

    if (!existingTrip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    const updatedTrip = await prisma.trip.update({
        data: { ...payload },
        where: { id: tripId, userId },
    });

    await cacheListUpdateItem<Trip>(key, tripId, updatedTrip);

    await invalidateStatsCache(userId);

    return updatedTrip;
};

export const deleteTripService = async (
    tripId: string,
    userId: string
): Promise<{ success: true }> => {
    const key = cacheKeyTrip(userId);
    const existingTrip = await getTripById(tripId, userId);

    if (!existingTrip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    await prisma.trip.delete({
        where: { id: tripId, userId },
    });

    await cacheListRemoveItem<Trip>(key, tripId);

    await invalidateStatsCache(userId);

    return { success: true };
};

export const changeTripStatusService = async (
    tripId: string,
    payload: ChangeTripStatusSchemaType,
    userId: string
) => {
    const key = cacheKeyTrip(userId);
    const existingTrip = await getTripById(tripId, userId);

    if (!existingTrip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    const updatedTrip = await prisma.trip.update({
        data: { status: payload.status },
        where: { id: tripId, userId },
    });

    await cacheListUpdateItem<Trip>(key, tripId, updatedTrip);

    await cacheInvalidate(key);

    await invalidateStatsCache(userId);

    return updatedTrip;
};
