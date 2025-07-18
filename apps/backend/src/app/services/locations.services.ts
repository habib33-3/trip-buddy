import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { getCoordinatesAndCountry } from "@/utils/map";
import {
    generateLocationCacheKey,
    generateTripCacheKey,
    getJsonFromRedis,
    setJsonToRedis,
    updateRedisListCache,
} from "@/utils/redis";

import ApiError from "@/shared/ApiError";

import type { AddLocationSchemaType } from "@/validations/locations.validations";

import type { Location } from "@/generated/prisma";

import { getTripById } from "./trip.services";

export const addLocationService = async (
    payload: AddLocationSchemaType,
    userId: string
): Promise<Location> => {
    const tripKey = generateTripCacheKey(userId);
    const trip = await getTripById(tripKey, payload.tripId, userId);

    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    const { country, formattedAddress, lat, lng } = await getCoordinatesAndCountry(payload.address);

    const location = await prisma.$transaction(async (tx) => {
        return tx.location.create({
            data: {
                address: payload.address,
                country,
                formattedAddress,
                latitude: lat,
                longitude: lng,
                tripId: payload.tripId,
            },
        });
    });

    const key = generateLocationCacheKey(trip.id);

    await updateRedisListCache<Location>(key, location);

    return location;
};

export const getLocationsService = async (tripId: string, userId: string) => {
    const key = generateLocationCacheKey(tripId);

    const cachedLocations = await getJsonFromRedis<Location[]>(key);

    if (cachedLocations) {
        return cachedLocations;
    }

    const trip = await getTripById(key, tripId, userId);

    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Trip not found");
    }

    const dbLocations = await prisma.location.findMany({
        select: {
            address: true,
            formattedAddress: true,
            id: true,
            latitude: true,
            longitude: true,
            trip: {
                select: {
                    title: true,
                },
            },
        },
        where: { tripId },
    });

    await setJsonToRedis(key, dbLocations);

    return dbLocations;
};
