import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { redis } from "@/lib/redis";

import ApiError from "@/shared/ApiError";
import { CACHE_TTL_SECONDS } from "@/shared/constants";

type NominatimSearchResponse = {
    lat: string;
    lon: string;
    display_name: string;
}[];

type NominatimReverseResponse = {
    display_name: string;
    address?: {
        country?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    error?: string;
};

export type CoordinatesAndCountry = {
    lat: number;
    lng: number;
    country: string;

    formattedAddress: string;
};

const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

const fetchWithRetry = async (
    url: string,
    options: RequestInit,
    retries = 3,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    backoff = 300
): Promise<Response> => {
    try {
        const res = await fetch(url, options);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res;
    } catch (err) {
        if (retries === 0) throw err;
        await delay(backoff);
        return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
};

export const getCoordinatesAndCountry = async (address: string): Promise<CoordinatesAndCountry> => {
    try {
        const cacheKey = `geo:${address.toLowerCase()}`;

        const cached = await redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached) as CoordinatesAndCountry;
        }

        const userAgent = `${env.APP_NAME}/1.0 (${env.APP_EMAIL})`;
        const headers = {
            "Accept-Language": "en",
            "User-Agent": userAgent,
        };

        const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
        )}&limit=1`;

        const searchRes = await fetchWithRetry(searchUrl, { headers });

        const searchData = (await searchRes.json()) as NominatimSearchResponse;

        if (searchData.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Address not found");
        }

        const { lat, lon } = searchData[0];

        const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;

        const reverseRes = await fetchWithRetry(reverseUrl, { headers });

        const reverseData = (await reverseRes.json()) as NominatimReverseResponse;

        if (reverseData.error) {
            throw new ApiError(StatusCodes.NOT_FOUND, "Address not found");
        }

        const result: CoordinatesAndCountry = {
            country: reverseData.address?.country ?? "Unknown",
            formattedAddress: reverseData.display_name,
            lat: parseFloat(lat),
            lng: parseFloat(lon),
        };

        await redis.set(cacheKey, JSON.stringify(result), "EX", CACHE_TTL_SECONDS);

        return result;
    } catch (error) {
        throw error instanceof ApiError
            ? error
            : new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetch coordinates");
    }
};
