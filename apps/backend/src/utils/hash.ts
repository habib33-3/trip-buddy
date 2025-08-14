import * as argon2 from "argon2";

import { env } from "@/config/env.config";

const PEPPER = env.HASH_SECRET_PEPPER;

export const hashData = async (data: string) => {
    if (typeof data !== "string" || !data.trim()) {
        throw new Error("Data to hash must be a non-empty string");
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
