import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { getCoordinatesAndCountry } from "@/utils/map";
import {
    generateLocationCacheKey,
    generateTripCacheKey,
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

    const { country, lat, lng } = await getCoordinatesAndCountry(payload.address);

    const location = await prisma.$transaction(async (tx) => {
        const maxOrderLocation = await tx.location.findFirst({
            orderBy: { order: "desc" },
            select: { order: true },
            where: { tripId: payload.tripId },
        });

        const newOrder = (maxOrderLocation?.order ?? 0) + 1;

        return tx.location.create({
            data: {
                address: payload.address,
                country,
                latitude: lat,
                longitude: lng,
                order: newOrder,
                tripId: payload.tripId,
            },
        });
    });

    const key = generateLocationCacheKey(trip.id);

    await updateRedisListCache<Location>(key, location);

    return location;
};
