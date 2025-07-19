import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { getCoordinatesAndCountry } from "@/utils/map";
import {
    generateItineraryCacheKey,
    generateTripCacheKey,
    getJsonFromRedis,
    updateRedisListCache,
} from "@/utils/redis";

import ApiError from "@/shared/ApiError";

import type { AddItinerarySchemaType } from "@/validations/itinerary.validations";

import type { Itinerary } from "@/generated/prisma";

import { getTripById } from "./trip.services";

export const addItineraryService = async (payload: AddItinerarySchemaType, userId: string) => {
    const tripKey = generateTripCacheKey(userId);

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

    const { country, formattedAddress, lat, lng } = await getCoordinatesAndCountry(payload.address);

    const generateTitle = `${formattedAddress} - ${country}`;

    const itinerary = await prisma.$transaction(async (tx) => {
        const itineraryCount = await tx.itinerary.count({
            where: {
                tripId: payload.tripId,
            },
        });

        const order = itineraryCount + 1;

        return tx.itinerary.create({
            data: {
                country,
                latitude: lat,
                longitude: lng,
                order,
                title: generateTitle,
                tripId: payload.tripId,
            },
        });
    });

    const key = generateItineraryCacheKey(userId, payload.tripId);

    await updateRedisListCache(key, itinerary);

    return itinerary;
};

export const getAllItinerariesService = async (tripId: string, userId: string) => {
    const tripKey = generateTripCacheKey(userId);

    const trip = await getTripById(tripKey, tripId, userId);

    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Trip not found");
    }

    if (trip.userId !== userId) {
        throw new ApiError(
            StatusCodes.FORBIDDEN,
            "You are not allowed to view this trip's itineraries"
        );
    }

    const key = generateItineraryCacheKey(userId, tripId);

    const cachedItineraries = await getJsonFromRedis<Itinerary[]>(key);

    if (cachedItineraries) {
        return cachedItineraries.sort((a, b) => a.order - b.order);
    }

    return prisma.itinerary.findMany({
        orderBy: { order: "asc" },
        where: { tripId },
    });
};
