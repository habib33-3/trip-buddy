import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { getCoordinates } from "@/utils/map";
import { generateTripCacheKey } from "@/utils/redis";

import ApiError from "@/shared/ApiError";

import type { AddLocationSchemaType } from "@/validations/locations.validations";

import { getTripById } from "./trip.services";

export const addLocationService = async (payload: AddLocationSchemaType, userId: string) => {
    const key = generateTripCacheKey(userId);

    const trip = await getTripById(key, payload.tripId, userId);

    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Trip not found`);
    }

    const { lat, lng } = await getCoordinates(payload.address);

    return prisma.location.create({
        data: {
            address: payload.address,
            country: "",
            latitude: lat,
            longitude: lng,
            order: 0,
            tripId: payload.tripId,
        },
    });
};
