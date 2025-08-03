import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import {
    cacheGet,
    cacheInvalidate,
    cacheListRemoveItem,
    cacheRefreshTTL,
    cacheSet,
    invalidateStatsCache,
} from "@/utils/cache";
import { cacheKeyItinerary, cacheKeyStats, cacheKeyTrip } from "@/utils/cache-key";

import ApiError from "@/shared/ApiError";

import type {
    AddItinerarySchemaType,
    ChangeItineraryStatusSchemaType,
    UpdateItinerarySchemaType,
} from "@/validations/itinerary.validations";

import type { Itinerary } from "@/generated/prisma";

import { getSinglePlaceService } from "./place.services";
import { getTripById } from "./trip.services";

export const addItineraryService = async (payload: AddItinerarySchemaType, userId: string) => {
    const tripKey = cacheKeyTrip(userId);
    const itineraryKey = cacheKeyItinerary(userId, payload.tripId);
    const statsKey = cacheKeyStats(userId);

    const place = await getSinglePlaceService(payload.placeId);
    if (!place) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Place not found");
    }

    const trip = await getTripById(payload.tripId, userId);
    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Trip not found");
    }

    if (trip.userId !== userId) {
        throw new ApiError(
            StatusCodes.FORBIDDEN,
            "You are not allowed to add an itinerary to this trip"
        );
    }
    const title =
        payload.title && payload.title.length > 0 ? payload.title : `Visit to ${place.city}`;

    const itinerary = await prisma.itinerary.create({
        data: {
            notes: payload.notes,
            placeId: place.id,
            title,
            tripId: payload.tripId,
        },
    });

    await Promise.all([
        cacheInvalidate(itineraryKey),
        cacheInvalidate(tripKey),
        cacheInvalidate(statsKey),
    ]);

    return itinerary;
};

export const getAllItinerariesService = async (tripId: string, userId: string) => {
    const itineraryKey = cacheKeyItinerary(userId, tripId);

    const cachedItineraries = await cacheGet<Itinerary[]>(itineraryKey);
    if (cachedItineraries && cachedItineraries.length > 0) {
        await cacheRefreshTTL(itineraryKey);
        return cachedItineraries;
    }

    const itineraries = await prisma.itinerary.findMany({
        include: { place: true },
        orderBy: { createdAt: "asc" },
        where: { tripId },
    });

    await cacheSet(itineraryKey, itineraries);
    return itineraries;
};

export const getItineraryByIdService = async (itineraryId: string, userId: string) => {
    const itineraryKey = cacheKeyItinerary(userId, itineraryId);

    const cachedItinerary = await cacheGet<Itinerary>(itineraryKey);

    if (cachedItinerary) {
        await cacheRefreshTTL(itineraryKey);
        return cachedItinerary;
    }

    const itinerary = await prisma.itinerary.findFirst({
        include: { place: true },
        where: {
            id: itineraryId,
            trip: {
                userId,
            },
        },
    });

    if (itinerary) {
        await cacheSet(itineraryKey, itinerary);
    }
    return itinerary;
};

export const updateItineraryService = async (
    itineraryId: string,
    payload: UpdateItinerarySchemaType,
    userId: string
) => {
    const itinerary = await getItineraryByIdService(itineraryId, userId);

    if (!itinerary) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Itinerary not found for this user");
    }

    const updatedItinerary = await prisma.itinerary.update({
        data: { ...payload },
        where: { id: itineraryId },
    });

    await Promise.all([
        cacheInvalidate(cacheKeyItinerary(userId, itineraryId)),
        cacheInvalidate(cacheKeyItinerary(userId, itinerary.tripId)),
        invalidateStatsCache(userId),
    ]);

    return updatedItinerary;
};

export const deleteItineraryService = async (itineraryId: string, userId: string) => {
    const itinerary = await getItineraryByIdService(itineraryId, userId);

    if (!itinerary) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Itinerary not found");
    }

    await prisma.itinerary.delete({
        where: { id: itineraryId },
    });

    await Promise.all([
        cacheInvalidate(cacheKeyItinerary(userId, itineraryId)),
        cacheInvalidate(cacheKeyItinerary(userId, itinerary.tripId)),
        cacheListRemoveItem<Itinerary>(cacheKeyTrip(userId), itineraryId),
        invalidateStatsCache(userId),
        cacheInvalidate(cacheKeyTrip(userId)),
    ]);

    return { message: "Itinerary deleted successfully" };
};

export const changeItineraryStatusService = async (
    itineraryId: string,
    payload: ChangeItineraryStatusSchemaType,
    userId: string
) => {
    const itinerary = await getItineraryByIdService(itineraryId, userId);

    if (!itinerary) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Itinerary not found");
    }

    const updatedItinerary = await prisma.itinerary.update({
        data: { status: payload.status },
        where: { id: itineraryId },
    });

    await Promise.all([
        cacheInvalidate(cacheKeyItinerary(userId, itineraryId)),
        cacheInvalidate(cacheKeyItinerary(userId, itinerary.tripId)),
        invalidateStatsCache(userId),
    ]);

    return updatedItinerary;
};
