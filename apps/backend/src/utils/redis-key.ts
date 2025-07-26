import { env } from "@/config/env.config";

const withPrefix = (...parts: string[]): string => `${env.REDIS_KEY_PREFIX}:${parts.join(":")}`;

export const cacheKeyUser = (userId: string): string => withPrefix("user", userId);

export const cacheKeyRefreshToken = (userId: string): string => withPrefix("refreshToken", userId);

export const cacheKeyTrip = (userId: string): string => withPrefix("trip", userId);

export const cacheKeyItinerary = (userId: string, tripId: string): string =>
    withPrefix("itinerary", userId, tripId);

export const cacheKeyStats = (userId: string): string => withPrefix("stats", userId);

export const cacheKeyPlace = (searchQuery = ""): string =>
    withPrefix("place", "search", searchQuery);

export const cacheKeySinglePlace = (placeId: string): string =>
    withPrefix("place", "single", placeId);
