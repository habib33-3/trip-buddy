import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

import { cacheSet } from "@/utils/cache";
import { cacheKeyRefreshToken } from "@/utils/cache-key";
import { compareHashData, hashData } from "@/utils/hash";
import { generateAuthTokens, verifyToken } from "@/utils/jwt";

import ApiError from "@/shared/ApiError";

import type { RegisterUserType } from "@/validations/auth.validations";

import { findUserByEmail } from "./user.service";

export const generateInitials = (name: string) => {
    if (!name || typeof name !== "string") {
        return "";
    }

    const trimmed = name.trim();
    if (!trimmed) {
        return "";
    }

    return name
        .trim()
        .split(" ")
        .filter((word) => word.length > 0)
        .map((word) => word.charAt(0))
        .map((char) => char.toUpperCase())
        .join("");
};

export const registerUserService = async (data: RegisterUserType) => {
    const isUserExists = await findUserByEmail(data.email);

    if (isUserExists) {
        throw new ApiError(StatusCodes.CONFLICT, "User already exists");
    }

    const initials = generateInitials(data.name);

    const hashedPassword = await hashData(data.password);

    const user = await prisma.user.create({
        data: {
            ...data,
            initials,
            password: hashedPassword,
        },
        select: {
            createdAt: true,
            email: true,
            id: true,
            image: true,
            initials: true,
            name: true,
            updatedAt: true,
        },
    });

    const refreshKey = cacheKeyRefreshToken(user.id);
    const { accessToken, refreshToken } = generateAuthTokens({
        email: user.email,
        id: user.id,
    });

    await cacheSet(refreshKey, refreshToken);

    return {
        token: {
            accessToken,
            refreshToken,
        },
        user,
    };
};

export const userLoginService = async (email: string, password: string) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const isPasswordMatch = await compareHashData(user.password, password);

    if (!isPasswordMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
    }

    const { accessToken, refreshToken } = generateAuthTokens({
        email: user.email,
        id: user.id,
    });

    const { password: _password, ...userWithoutPassword } = user;

    await redis.setex(cacheKeyRefreshToken(user.id), env.REFRESH_TOKEN_EXPIRATION, refreshToken);

    return {
        token: {
            accessToken,
            refreshToken,
        },
        user: userWithoutPassword,
    };
};

export const refreshTokenService = async (refreshToken: string) => {
    const decoded = verifyToken(refreshToken, "refresh_token");

    const userExists = await findUserByEmail(decoded.email);

    if (!userExists) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const key = cacheKeyRefreshToken(decoded.id);
    const cachedRefreshToken = await redis.get(key);

    if (!cachedRefreshToken || refreshToken !== cachedRefreshToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const { accessToken } = generateAuthTokens({
        email: decoded.email,
        id: decoded.id,
    });

    return {
        accessToken,
    };
};

export const userLogoutService = async (refreshToken: string) => {
    const decoded = verifyToken(refreshToken, "refresh_token");

    const key = cacheKeyRefreshToken(decoded.id);

    await redis.del(key);
};
