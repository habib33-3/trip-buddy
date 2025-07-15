import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import ApiError from "@/shared/ApiError";

export const getCoordinates = async (address: string) => {
    const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
        )}&limit=1`,
        {
            headers: {
                "User-Agent": `${env.APP_NAME}/1.0 (${env.APP_EMAIL})`,
            },
        }
    );

    const data = (await response.json()) as { lat: string; lon: string }[];

    if (data.length === 0) {
        throw new ApiError(StatusCodes.NOT_FOUND, "Address not found");
    }

    const { lat, lon } = data[0];

    return { lat: parseFloat(lat), lng: parseFloat(lon) };
};
