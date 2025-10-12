import * as argon2 from "argon2";
import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import ApiError from "@/shared/ApiError";

const PEPPER = env.HASH_SECRET_PEPPER;

export const hashData = async (data: string) => {
    if (typeof data !== "string" || !data.trim()) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid data");
    }

    return argon2.hash(data, {
        hashLength: 32,
        memoryCost: 2 ** 16,
        parallelism: 2,
        secret: Buffer.from(PEPPER),
        timeCost: 4,
        type: argon2.argon2id,
    });
};

export const compareHashData = async (hashedData: string, plainData: string) => {
    if (typeof plainData !== "string" || !plainData.trim()) {
        return false;
    }

    return argon2.verify(hashedData, plainData, {
        secret: Buffer.from(PEPPER),
    });
};
