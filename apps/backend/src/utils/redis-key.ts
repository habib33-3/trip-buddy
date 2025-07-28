import { env } from "@/config/env.config";

import type { SearchTripParamSchemaType } from "@/validations/trip.validations";

const withPrefix = (...parts: string[]): string => `${env.REDIS_KEY_PREFIX}:${parts.join(":")}`;

export const cacheKeyUser = (userId: string): string => withPrefix("user", userId);

export const cacheKeyRefreshToken = (userId: string): string => withPrefix("refreshToken", userId);

export const cacheKeyTrip = (userId: string, searchParams?: SearchTripParamSchemaType): string =>
    withPrefix("trip", userId, JSON.stringify(searchParams));

export const cacheKeyItinerary = (userId: string, tripId: string): string =>
    withPrefix("itinerary", userId, tripId);

export const cacheKeyStats = (userId: string): string => withPrefix("stats", userId);

export const cacheKeyPlace = (searchQuery = ""): string =>
    withPrefix("place", "search", searchQuery);

export const cacheKeySinglePlace = (placeId: string): string =>
    withPrefix("place", "single", placeId);

export const cacheKeyPlacesByTrip = (userId: string, tripId: string) =>
    withPrefix(`places`, `trip`, userId, tripId);

export const cacheGeoKey = (address: string) => withPrefix("geo", address.toLowerCase());

export const cachePlaceCoordinatesKey = (coordinate: { lat: number; lng: number }) =>
    withPrefix("placeCoordinates", JSON.stringify(coordinate));
