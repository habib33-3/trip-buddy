import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { getCoordinatesAndCountry } from "@/utils/map";
import {
    generateItineraryCacheKey,
    generateTripCacheKey,
    getJsonFromRedis,
    invalidateRedisCache,
    setJsonToRedis,
    updateRedisListCache,
} from "@/utils/redis";

import ApiError from "@/shared/ApiError";

import type {
    AddItinerarySchemaType,
    ReorderItinerarySchemaType,
} from "@/validations/itinerary.validations";

import type { Itinerary } from "@/generated/prisma";

import { getTripById } from "./trip.services";

export const addItineraryService = async (payload: AddItinerarySchemaType, userId: string) => {
    const tripKey = generateTripCacheKey(userId);

    const { city, country, formattedAddress, lat, lng } = await getCoordinatesAndCountry(
        payload.address
    );

    const generateTitle = `${formattedAddress} - ${country}`;

    const itinerary = await prisma.$transaction(async (tx) => {
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

        const itineraryCount = await tx.itinerary.count({
            where: {
                tripId: payload.tripId,
            },
        });

        const order = itineraryCount + 1;

        return tx.itinerary.create({
            data: {
                city,
                country,
                formattedAddress,
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
    await invalidateRedisCache(tripKey);

    return itinerary;
};

export const getAllItinerariesService = async (tripId: string, userId: string) => {
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

export const reorderItineraryService = async (
    payload: ReorderItinerarySchemaType,
    userId: string
) => {
    const updatedItineraries = await prisma.$transaction(async (tx) => {
        return Promise.all(
            payload.itineraryIds.map(async (id, index) =>
                tx.itinerary.update({
                    data: { order: index },
                    where: { id },
                })
            )
        );
    });

    const key = generateItineraryCacheKey(userId, payload.tripId);

    await setJsonToRedis(key, updatedItineraries);

    return updatedItineraries;
};
