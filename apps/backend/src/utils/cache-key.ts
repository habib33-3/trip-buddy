import { env } from "@/config/env.config";

import type { SearchTripParamSchemaType } from "@/validations/trip.validations";

const withPrefix = (...parts: string[]): string =>
    `${env.APP_NAME}-cache:${parts.map((p) => encodeURIComponent(p)).join(":")}`;

// 👤 User-related
export const cacheKeyUser = (userId: string): string => withPrefix("user", userId);

export const cacheKeyUserEmail = (email: string): string => withPrefix("user", "email", email);

export const cacheKeyRefreshToken = (userId: string): string => withPrefix("refreshToken", userId);

export const cacheKeyStats = (userId: string): string => withPrefix("stats", userId);

// 🧳 Trip-related
export const cacheKeyTrip = (userId: string, searchParams?: SearchTripParamSchemaType): string => {
    const searchQuery = (searchParams?.searchQuery ?? "").trim().toLowerCase();

    const statusArray = Array.isArray(searchParams?.status)
        ? [...new Set(searchParams.status.map((s) => s.toUpperCase()))]
        : ["ACTIVE", "PLANNED"];

    const status = statusArray.sort().join(",");

    return withPrefix("trip", userId, `query=${encodeURIComponent(searchQuery)}&status=${status}`);
};

export const cacheKeyRecentTrips = (userId: string): string =>
    withPrefix("recent", "trips", userId);

export const cacheKeyPlacesByTrip = (userId: string, tripId: string): string =>
    withPrefix("places", "trip", userId, tripId);

// 📋 Itinerary-related
export const cacheKeyItinerary = (userId: string, tripId: string): string =>
    withPrefix("itinerary", userId, tripId);

// 📍 Place-related
export const cacheKeyPlace = (searchQuery = ""): string =>
    withPrefix("place", "search", searchQuery.toLowerCase());

export const cacheKeySinglePlace = (placeId: string): string =>
    withPrefix("place", "single", placeId);

export const cachePlaceCoordinatesKey = (coordinate: { lat: number; lng: number }): string =>
    withPrefix("placeCoordinates", JSON.stringify(coordinate));

// 🌍 Geo-related
export const cacheGeoKey = (address: string): string => withPrefix("geo", address.toLowerCase());

export const cacheKeyFlag = (countryName: string) => withPrefix("flag", countryName);
