import { env } from "@/config/env.config";

/**
 * Utility to generate Redis key with a global prefix.
 *
 * @param parts - Parts of the key to join.
 * @returns Namespaced Redis key.
 */
const withPrefix = (...parts: string[]): string => `${env.REDIS_KEY_PREFIX}:${parts.join(":")}`;

/**
 * Generate Redis key for user-specific cache.
 */
export const cacheKeyUser = (userId: string): string => withPrefix("user", userId);

/**
 * Generate Redis key for refresh tokens.
 */
export const cacheKeyRefreshToken = (userId: string): string => withPrefix("refreshToken", userId);

/**
 * Generate Redis key for a user's trips list.
 */
export const cacheKeyTrip = (userId: string): string => withPrefix("trip", userId);

/**
 * Generate Redis key for itinerary of a specific trip.
 */
export const cacheKeyItinerary = (userId: string, tripId: string): string =>
    withPrefix("itinerary", userId, tripId);

/**
 * Generate Redis key for user travel statistics.
 */
export const cacheKeyStats = (userId: string): string => withPrefix("stats", userId);
