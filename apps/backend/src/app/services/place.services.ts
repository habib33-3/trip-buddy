import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { cacheGet, cacheListPrepend, cacheRefreshTTL, cacheSet } from "@/utils/cache";
import {
    cacheKeyPlace,
    cacheKeyPlacesByTrip,
    cacheKeySinglePlace,
    cachePlaceCoordinatesKey,
} from "@/utils/cache-key";
import { getCoordinatesAndCountry } from "@/utils/map";

import ApiError from "@/shared/ApiError";

import type { AddPlaceSchemaType } from "@/validations/places.validations";

import type { Place } from "@/generated/prisma";

import { getTripById } from "./trip.services";

const getPlaceByCoordinateService = async (coordinate: { lat: number; lng: number }) => {
    const key = cachePlaceCoordinatesKey(coordinate);

    const cachedPlace = await cacheGet<Place>(key);

    if (cachedPlace) {
        await cacheRefreshTTL(key);
        return cachedPlace;
    }

    const place = await prisma.place.findFirst({
        where: {
            lat: coordinate.lat,
            lng: coordinate.lng,
        },
    });

    if (place) {
        await cacheSet(key, place);
    }

    return place;
};

export const addPlaceService = async (payload: AddPlaceSchemaType) => {
    const { city, country, formattedAddress, lat, lng } = await getCoordinatesAndCountry(
        payload.address
    );

    const existingPlace = await getPlaceByCoordinateService({
        lat,
        lng,
    });

    if (existingPlace) {
        return existingPlace;
    }

    const place = await prisma.place.create({
        data: { city: city ?? "", country, formattedAddress, lat, lng },
    });

    const key = cacheKeyPlace();

    const singleKey = cacheKeySinglePlace(place.id);

    await cacheSet(singleKey, place);

    await cacheListPrepend(key, place);

    return place;
};

export const getPlacesService = async (searchQuery?: string) => {
    const normalizedSearchQuery = (searchQuery ?? "").trim().toLowerCase();

    const key = cacheKeyPlace(normalizedSearchQuery);

    const cachedPlaces = await cacheGet<Place[]>(key);

    if (cachedPlaces !== null) {
        await cacheRefreshTTL(key);
        return cachedPlaces;
    }

    const places = await prisma.place.findMany({
        where: {
            formattedAddress: {
                contains: normalizedSearchQuery,
                mode: "insensitive",
            },
        },
    });

    await cacheSet(key, places);

    return places;
};

export const getSinglePlaceService = async (placeId: string) => {
    const key = cacheKeySinglePlace(placeId);

    const place = await cacheGet<Place>(key);

    if (place) {
        await cacheRefreshTTL(key);
        return place;
    }

    const singlePlace = await prisma.place.findUnique({ where: { id: placeId } });

    if (singlePlace) {
        await cacheSet(key, singlePlace);
    }

    return singlePlace;
};

export const getPlacesByTripService = async (tripId: string, userId: string) => {
    const key = cacheKeyPlacesByTrip(userId, tripId);

    const cachedPlaces = await cacheGet<Place[]>(key);

    if (cachedPlaces !== null) {
        await cacheRefreshTTL(key);
        return cachedPlaces;
    }

    const trip = await getTripById(tripId, userId);

    if (!trip) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Trip not found");
    }

    const places = await prisma.place.findMany({
        distinct: ["id"],
        where: {
            itineraries: {
                some: {
                    tripId,
                },
            },
        },
    });

    await cacheSet(key, places);

    return places;
};
