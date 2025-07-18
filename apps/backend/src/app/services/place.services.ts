import { prisma } from "@/lib/prisma";

import { getCoordinatesAndCountry } from "@/utils/map";
import {
    generatePlaceCacheKey,
    getJsonFromRedis,
    setJsonToRedis,
    updateRedisListCache,
} from "@/utils/redis";

import { Prisma } from "@/generated/prisma";

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const round = (num: number) => Math.round(num * 1e6) / 1e6;

export const addPlaceService = async (address: string) => {
    const { country, formattedAddress, lat, lng } = await getCoordinatesAndCountry(address);

    const latRounded = round(lat);
    const lngRounded = round(lng);

    let place = await prisma.place.findUnique({
        where: {
            latitude_longitude: {
                latitude: latRounded,
                longitude: lngRounded,
            },
        },
    });

    if (place) {
        return place;
    }

    try {
        place = await prisma.place.create({
            data: {
                address,
                country,
                formattedAddress,
                latitude: latRounded,
                longitude: lngRounded,
            },
        });

        const key = generatePlaceCacheKey();
        await updateRedisListCache(key, place);

        return place;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            place = await prisma.place.findUnique({
                where: {
                    latitude_longitude: {
                        latitude: latRounded,
                        longitude: lngRounded,
                    },
                },
            });

            if (place) {
                return place;
            }
        }

        throw error;
    }
};

export const getAllPlaceService = async () => {
    const keys = generatePlaceCacheKey();

    const cachedPlaces = await getJsonFromRedis(keys);

    if (cachedPlaces) {
        return cachedPlaces;
    }

    const places = await prisma.place.findMany();

    await setJsonToRedis(keys, places);

    return places;
};
