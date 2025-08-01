import { env } from "@/config/env.config";

import type { SearchTripParamSchemaType } from "@/validations/trip.validations";

const withPrefix = (...parts: string[]): string => `${env.REDIS_KEY_PREFIX}:${parts.join(":")}`;

// 👤 User-related
export const cacheKeyUser = (userId: string): string => withPrefix("user", userId);

export const cacheKeyRefreshToken = (userId: string): string => withPrefix("refreshToken", userId);

export const cacheKeyStats = (userId: string): string => withPrefix("stats", userId);

// 🧳 Trip-related
export const cacheKeyTrip = (userId: string, searchParams?: SearchTripParamSchemaType): string => {
    const searchQuery = searchParams?.searchQuery?.trim() ?? "";

    // status will always be present due to Zod transform, but let's be extra safe
    const statusArray = Array.isArray(searchParams?.status)
        ? [...searchParams.status]
        : ["ACTIVE", "PLANNED"];

    const status = statusArray.sort().join(",");

    return withPrefix("trip", userId, `query=${searchQuery}&status=${status}`);
};

export const cacheKeyPlacesByTrip = (userId: string, tripId: string): string =>
    withPrefix("places", "trip", userId, tripId);

// 📋 Itinerary-related
export const cacheKeyItinerary = (userId: string, tripId: string): string =>
    withPrefix("itinerary", userId, tripId);

// 📍 Place-related
export const cacheKeyPlace = (searchQuery = ""): string =>
    withPrefix("place", "search", searchQuery);

export const cacheKeySinglePlace = (placeId: string): string =>
    withPrefix("place", "single", placeId);

export const cachePlaceCoordinatesKey = (coordinate: { lat: number; lng: number }): string =>
    withPrefix("placeCoordinates", JSON.stringify(coordinate));

// 🌍 Geo-related
export const cacheGeoKey = (address: string): string => withPrefix("geo", address.toLowerCase());
