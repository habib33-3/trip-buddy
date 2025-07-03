import { StatusCodes } from "http-status-codes";
import jwt, { type SignOptions } from "jsonwebtoken";

import { env } from "@/config/env.config";

import ApiError from "@/shared/ApiError";

import type { TokenPayload } from "@/types";

const tokenOptions: SignOptions = {
    expiresIn: env.TOKEN_EXPIRATION,
    algorithm: "HS256",
};

export const createToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, tokenOptions);
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);
        return decoded as TokenPayload;
    } catch (error) {
        throw new ApiError(
            StatusCodes.UNAUTHORIZED,
            `Invalid token: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
};
