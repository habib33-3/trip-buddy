/* eslint-disable @typescript-eslint/no-magic-numbers */
import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { cacheGet, cacheRefreshTTL, cacheSet } from "@/utils/cache";

import ApiError from "@/shared/ApiError";

import { cacheGeoKey, cacheKeyFlag } from "./cache-key";
import { fetchWithRetry } from "./fetch";

type NominatimSearchResponse = {
    lat: string;
    lon: string;
    display_name: string;
}[];

type NominatimReverseResponse = {
    display_name: string;
    address?: {
        country?: string;
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        country_code?: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [key: string]: any;
    };
    error?: string;
};

export type CoordinatesAndCountry = {
    lat: number;
    lng: number;
    country: string;
    city?: string;
    formattedAddress: string;
    flag: string;
};

export const normalizeCoordinates = (coordinates: { lat: number; lng: number }) => ({
    lat: Math.round(coordinates.lat * 1e6) / 1e6,
    lng: Math.round(coordinates.lng * 1e6) / 1e6,
});

type CountryApiResponse = {
    flags: {
        png: string;
        svg: string;
        alt?: string;
    };
}[];

export const getCountryFlag = async (countryName: string): Promise<string> => {
    const cacheKey = cacheKeyFlag(countryName);

    const cached = await cacheGet<string>(cacheKey);

    if (cached) {
        await cacheRefreshTTL(cacheKey);
        return cached;
    }

    const url = `https://restcountries.com/v3.1/name/${countryName.trim().toLowerCase()}?fields=flags`;
    const data = await fetchWithRetry<CountryApiResponse>(url, { method: "GET" });

    if (data.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, `Country not found: ${countryName}`);
    }

    const flag = data[0].flags.png;

    if (!flag) {
        throw new ApiError(StatusCodes.NOT_FOUND, `No flag found for country: ${countryName}`);
    }

    await cacheSet(cacheKey, flag);

    return flag;
};

export const getCoordinatesAndCountry = async (address: string): Promise<CoordinatesAndCountry> => {
    try {
        const cacheKey = cacheGeoKey(address);

        const cached = await cacheGet<CoordinatesAndCountry>(cacheKey);

        if (cached) {
            await cacheRefreshTTL(cacheKey);
            return cached;
        }

        const userAgent = `${env.APP_NAME}/1.0 (${env.APP_EMAIL})`;
        const headers = {
            "Accept-Language": "en",
            "User-Agent": userAgent,
        };

        const searchUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
        )}&limit=1`;

        const searchData = await fetchWithRetry<NominatimSearchResponse>(searchUrl, { headers });

        if (searchData.length === 0) {
            throw new ApiError(StatusCodes.NOT_FOUND, `Address not found: ${address}`);
        }

        const latNum = parseFloat(searchData[0].lat);
        const lngNum = parseFloat(searchData[0].lon);

        const reverseUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latNum}&lon=${lngNum}&zoom=10&addressdetails=1`;

        const reverseData = await fetchWithRetry<NominatimReverseResponse>(reverseUrl, { headers });

        if (reverseData.error) {
            throw new ApiError(
                StatusCodes.NOT_FOUND,
                `Reverse lookup failed for ${latNum},${lngNum}`
            );
        }

        const { lat, lng } = normalizeCoordinates({ lat: latNum, lng: lngNum });

        const flag = await getCountryFlag(reverseData.address?.country ?? "Unknown");

        const result: CoordinatesAndCountry = {
            city:
                reverseData.address?.city ??
                reverseData.address?.town ??
                reverseData.address?.village ??
                reverseData.address?.state,
            country: reverseData.address?.country ?? "Unknown",
            flag,
            formattedAddress: reverseData.display_name,
            lat,
            lng,
        };

        await cacheSet(cacheKey, result);
        return result;
    } catch (error) {
        throw error instanceof ApiError
            ? error
            : new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to fetch coordinates");
    }
};
