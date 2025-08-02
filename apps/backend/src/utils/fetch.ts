import { StatusCodes } from "http-status-codes";

import ApiError from "@/shared/ApiError";

const delay = async (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fetchWithRetry = async <T>(
    url: string,
    options: RequestInit,
    retries = 3,
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    backoff = 300
): Promise<T> => {
    try {
        const res = await fetch(url, options);
        if (!res.ok) {
            throw new ApiError(
                res.status,
                `HTTP error while fetching ${url} (status: ${res.status})`
            );
        }

        try {
            return (await res.json()) as T;
        } catch {
            throw new ApiError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                `Failed to parse JSON from ${url}`
            );
        }
    } catch (error) {
        if (retries === 0) {
            throw new ApiError(
                StatusCodes.SERVICE_UNAVAILABLE,
                `Failed to fetch ${url} after multiple retries`
            );
        }

        if (error instanceof ApiError) {
            throw error;
        }

        await delay(backoff);
        return fetchWithRetry<T>(url, options, retries - 1, backoff * 2);
    }
};
