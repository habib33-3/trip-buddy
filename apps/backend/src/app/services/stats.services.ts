import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { cacheGet, cacheSet } from "@/utils/redis";
import { cacheKeyStats } from "@/utils/redis-key";

import ApiError from "@/shared/ApiError";

import { findUserById } from "./user.service";

export const getUserStatisticsService = async (userId: string) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const key = cacheKeyStats(userId);

    const cachedStats = await cacheGet<{ cities: unknown[]; countries: unknown[] }>(key);

    if (cachedStats) {
        return cachedStats;
    }

    const countries = await prisma.itinerary.findMany({
        distinct: ["country"],
        select: {
            country: true,
        },
        where: {
            trip: {
                userId,
            },
        },
    });

    const rawCities = await prisma.itinerary.findMany({
        distinct: ["city"],
        select: {
            city: true,
            country: true,
            latitude: true,
            longitude: true,
        },
        where: {
            city: {
                not: null,
            },
            trip: {
                userId,
            },
        },
    });

    const cities = rawCities.map((city) => ({
        lat: city.latitude,
        lng: city.longitude,
        name: city.city,
    }));

    await cacheSet(key, { cities, countries });

    return { cities, countries };
};
