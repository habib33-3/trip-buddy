import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { cacheGet, cacheRefreshTTL, cacheSet } from "@/utils/cache";
import { cacheKeyStats } from "@/utils/cache-key";

import ApiError from "@/shared/ApiError";

import type { CityStat, Stat } from "@/types";

import { findUserByIdService } from "./user.services";

const generateStatReport = async (userId: string): Promise<Stat> => {
    const [itineraries, tripsCount, itineraryCount, tripStatusCounts] = await Promise.all([
        prisma.itinerary.findMany({
            select: {
                place: {
                    select: {
                        city: true,
                        country: true,
                        countryFlag: true,
                        lat: true,
                        lng: true,
                    },
                },
                trip: {
                    select: { userId: true },
                },
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

    const cityMap = new Map<string, CityStat>();
    const countryMap = new Map<string, number>();
    const countrySet = new Set<string>();

    for (const itinerary of itineraries) {
        const { place } = itinerary;
        if (!place.country || !place.city) continue;

        const { city, country, lat, lng } = place;

        const countryKey = country.toLowerCase();
        countrySet.add(countryKey);
        countryMap.set(countryKey, (countryMap.get(countryKey) ?? 0) + 1);

        const cityKey = city.toLowerCase();
        const existing = cityMap.get(cityKey);

        if (existing) {
            existing.count += 1;
        } else {
            cityMap.set(cityKey, {
                count: 1,
                lat,
                lng,
                name: city,
            });
        }
    }

    const cities = [...cityMap.values()].sort((a, b) => b.count - a.count);

    let mostVisitedCountry: Stat["mostVisitedCountry"] = {
        count: 0,
        flag: "",
        name: "",
    };

    if (countryMap.size > 0) {
        const [mostVisitedName, mostVisitedCount] = [...countryMap.entries()].sort(
            (a, b) => b[1] - a[1]
        )[0];

        const countryFlag =
            itineraries.find((it) => it.place.country.toLowerCase() === mostVisitedName)?.place
                .countryFlag ?? "";

        mostVisitedCountry = {
            count: mostVisitedCount,
            flag: countryFlag,
            name: mostVisitedName,
        };
    }

    const statusCountMap = Object.fromEntries(
        tripStatusCounts.map((item) => [item.status, item._count._all])
    );

    return {
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
};

export const getUserStatisticsService = async (userId: string) => {
    const user = await findUserByIdService(userId);
    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const cacheKey = cacheKeyStats(userId);
    const cached = await cacheGet<Stat>(cacheKey);
    if (cached) {
        await cacheRefreshTTL(cacheKey);
        return cached;
    }

    const report = await generateStatReport(userId);

    await cacheSet(cacheKey, report);
    return report;
};
