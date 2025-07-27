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

import type {
    CreateTripSchemaType,
    SearchTripParamSchemaType,
    UpdateTripSchemaType,
} from "@/validations/trip.validations";

import type { Trip, TripStatus } from "@/generated/prisma";

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

export const getAllTripsService = async (
    userId: string,
    searchTripParams: SearchTripParamSchemaType
): Promise<Trip[]> => {
    const key = cacheKeyTrip(userId, searchTripParams);
    const cachedTrips = await cacheGet<Trip[]>(key);

    if (cachedTrips?.length) {
        await cacheRefreshTTL(key);
        return cachedTrips;
    }

    const trips = await prisma.trip.findMany({
        where: {
            description: {
                contains: searchTripParams.searchQuery ?? "",
                mode: "insensitive",
            },
            status: {
                in: searchTripParams.status as TripStatus[],
            },

            title: {
                contains: searchTripParams.searchQuery ?? "",
                mode: "insensitive",
            },
            userId,
        },
    });

    if (trips.length > 0) {
        await cacheSet<Trip[]>(key, trips);
    }

    return trips;
};

export const getSingleTripService = async (
    tripId: string,
    userId: string
): Promise<Trip | null> => {
    const key = cacheKeyTrip(userId);
    return getTripById(key, tripId, userId);
};

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

    await cacheInvalidate(key);

    return updatedTrip;
};

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
