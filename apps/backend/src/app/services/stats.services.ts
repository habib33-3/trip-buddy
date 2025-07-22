import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { cacheGet, cacheSet } from "@/utils/redis";
import { cacheKeyStats } from "@/utils/redis-key";

import ApiError from "@/shared/ApiError";

import type { Stat } from "@/types";

import { findUserById } from "./user.service";

export const getUserStatisticsService = async (userId: string) => {
    const user = await findUserById(userId);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const cacheKey = cacheKeyStats(userId);
    const cached = await cacheGet<Stat>(cacheKey);
    if (cached) return cached;

    const [itineraries, tripsCount, itineraryCount, tripStatusCounts] = await Promise.all([
        prisma.itinerary.findMany({
            select: {
                city: true,
                country: true,
                latitude: true,
                longitude: true,
                trip: { select: { userId: true } },
            },
            where: {
                trip: { userId },
            },
        }),
        prisma.trip.count({ where: { userId } }),
        prisma.itinerary.count({ where: { trip: { userId } } }),
        prisma.trip.groupBy({
            _count: { _all: true },
            by: ["status"],
            where: { userId },
        }),
    ]);

    const cityMap = new Map<string, { lat: number; lng: number; name: string; count: number }>();
    const countryMap = new Map<string, number>();
    const countrySet = new Set<string>();

    for (const { city, country, latitude, longitude } of itineraries) {
        if (country) countrySet.add(country);
        if (country) {
            const countryKey = country.toLowerCase();
            countryMap.set(countryKey, (countryMap.get(countryKey) ?? 0) + 1);
        }

        if (city) {
            const cityKey = city.toLowerCase();
            const existing = cityMap.get(cityKey);

            if (existing) {
                existing.count += 1;
            } else {
                cityMap.set(cityKey, {
                    count: 1,
                    lat: latitude,
                    lng: longitude,
                    name: city,
                });
            }
        }
    }

    const mostVisitedCountry =
        [...countryMap.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    const cities = [...cityMap.values()].sort((a, b) => b.count - a.count);

    const statusCountMap = Object.fromEntries(
        tripStatusCounts.map((item) => [item.status, item._count._all])
    );

    const stats = {
        cities,
        countries: countrySet.size,
        itineraryCount,
        mostVisitedCountry,
        tripsCount,
        tripStatusCounts: {
            completed: statusCountMap.COMPLETED || 0,
            inProgress: statusCountMap.IN_PROGRESS || 0,
            planned: statusCountMap.PLANNED || 0,
        },
    };

    await cacheSet(cacheKey, stats);

    return stats;
};
