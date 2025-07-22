import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { getCoordinatesAndCountry } from "@/utils/map";
import { cacheGet, cacheInvalidate, cacheSet } from "@/utils/redis";
import { cacheKeyItinerary, cacheKeyStats, cacheKeyTrip } from "@/utils/redis-key";

import ApiError from "@/shared/ApiError";

import type {
    AddItinerarySchemaType,
    ReorderItinerarySchemaType,
} from "@/validations/itinerary.validations";

import type { Itinerary } from "@/generated/prisma";

import { getTripById } from "./trip.services";

export const addItineraryService = async (payload: AddItinerarySchemaType, userId: string) => {
    const tripKey = cacheKeyTrip(userId);

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

    const itineraryKey = cacheKeyItinerary(userId, payload.tripId);

    await cacheInvalidate(itineraryKey);
    await cacheInvalidate(tripKey);

    const statsKey = cacheKeyStats(userId);

    await cacheInvalidate(statsKey);

    return itinerary;
};

export const getAllItinerariesService = async (tripId: string, userId: string) => {
    const itineraryKey = cacheKeyItinerary(userId, tripId);

    const cachedItineraries = await cacheGet<Itinerary[]>(itineraryKey);

    if (cachedItineraries) {
        return cachedItineraries.sort((a, b) => a.order - b.order);
    }

    const itineraries = await prisma.itinerary.findMany({
        orderBy: { order: "asc" },
        where: { tripId },
    });

    await cacheSet(itineraryKey, itineraries);

    return itineraries;
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

    const itineraryKey = cacheKeyItinerary(userId, payload.tripId);

    await cacheSet(itineraryKey, updatedItineraries);

    return updatedItineraries;
};
