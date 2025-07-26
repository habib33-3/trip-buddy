import { prisma } from "@/lib/prisma";

import { getCoordinatesAndCountry } from "@/utils/map";
import { cacheGet, cacheListPrepend, cacheSet } from "@/utils/redis";
import { cacheKeyPlace, cacheKeySinglePlace } from "@/utils/redis-key";

import type { AddPlaceSchemaType } from "@/validations/places.validations";

import type { Place } from "@/generated/prisma";

export const addPlaceService = async (payload: AddPlaceSchemaType) => {
    const { city, country, formattedAddress, lat, lng } = await getCoordinatesAndCountry(
        payload.address
    );

    const place = await prisma.place.create({
        data: { city, country, formattedAddress, lat, lng },
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

    if (cachedPlaces !== null && cachedPlaces !== undefined) {
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
        return place;
    }

    const singlePlace = await prisma.place.findUnique({ where: { id: placeId } });

    if (singlePlace) {
        await cacheSet(key, singlePlace);
    }

    return singlePlace;
};
