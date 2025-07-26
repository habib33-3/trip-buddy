import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { cacheGet, cacheInvalidate, cacheSet } from "@/utils/redis";
import { cacheKeyItinerary, cacheKeyStats, cacheKeyTrip } from "@/utils/redis-key";

import ApiError from "@/shared/ApiError";

import type { AddItinerarySchemaType } from "@/validations/itinerary.validations";

import type { Itinerary } from "@/generated/prisma";

import { getSinglePlaceService } from "./place.services";
import { getTripById } from "./trip.services";

/**
 * Add an itinerary for a given trip
 */
export const addItineraryService = async (payload: AddItinerarySchemaType, userId: string) => {
    const tripKey = cacheKeyTrip(userId);
    const itineraryKey = cacheKeyItinerary(userId, payload.tripId);
    const statsKey = cacheKeyStats(userId);

    const place = await getSinglePlaceService(payload.placeId);
    if (!place) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Place not found");
    }

    const trip = await getTripById(tripKey, payload.tripId, userId);
    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Trip not found");
    }

    if (trip.userId !== userId) {
        throw new ApiError(
            StatusCodes.FORBIDDEN,
            "You are not allowed to add an itinerary to this trip"
        );
    }

    const title = payload.title ?? `${place.formattedAddress} - ${place.country}`;

    const itinerary = await prisma.itinerary.create({
        data: {
            notes: payload.notes ?? "",
            placeId: place.id,
            title,
            tripId: payload.tripId,
        },
    });

    // Invalidate relevant cache keys
    await Promise.all([
        cacheInvalidate(itineraryKey),
        cacheInvalidate(tripKey),
        cacheInvalidate(statsKey),
    ]);

    return itinerary;
};

/**
 * Get all itineraries for a given trip
 */
export const getAllItinerariesService = async (tripId: string, userId: string) => {
    const itineraryKey = cacheKeyItinerary(userId, tripId);

    const cachedItineraries = await cacheGet<Itinerary[]>(itineraryKey);
    if (cachedItineraries) return cachedItineraries;

    const itineraries = await prisma.itinerary.findMany({
        include: { place: true },
        orderBy: { createdAt: "asc" },
        where: { tripId },
    });

    await cacheSet(itineraryKey, itineraries);
    return itineraries;
};
