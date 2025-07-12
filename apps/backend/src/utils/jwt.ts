import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

import { env } from "@/config/env.config";

import ApiError from "@/shared/ApiError";
import type { TokenTypes } from "@/shared/constants";

import type { TokenPayload } from "@/types";

export const getTokenConfig = (tokenType: TokenTypes) => {
    const isAccess = tokenType === "access_token";

    return {
        secret: isAccess ? env.ACCESS_TOKEN_SECRET : env.REFRESH_TOKEN_SECRET,
        expiresIn: isAccess ? env.ACCESS_TOKEN_EXPIRATION : env.REFRESH_TOKEN_EXPIRATION,
    };
};

export const createToken = (payload: TokenPayload, tokenType: TokenTypes): string => {
    const { secret, expiresIn } = getTokenConfig(tokenType);

    return jwt.sign(payload, secret, { expiresIn, algorithm: "HS256" });
};

export const verifyToken = (token: string, tokenType: TokenTypes): TokenPayload => {
    const { secret } = getTokenConfig(tokenType);

    try {
        return jwt.verify(token, secret) as TokenPayload;
    } catch {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or expired token");
    }
};

export const generateAuthTokens = (payload: TokenPayload) => {
    return {
        accessToken: createToken(payload, "access_token"),
        refreshToken: createToken(payload, "refresh_token"),
    };
};
