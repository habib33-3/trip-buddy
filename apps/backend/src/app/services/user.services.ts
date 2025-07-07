import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";

import { compareHashData, hashData } from "@/utils/hash";
import { generateAuthTokens, verifyToken } from "@/utils/jwt";
import { generateRefreshTokenKey } from "@/utils/redis";

import ApiError from "@/shared/ApiError";

import type { RegisterUserType } from "@/validations/user.validations";

export const findUserByEmail = async (email: string) => {
    return prisma.user.findUnique({ where: { email } });
};

export const generateInitials = (name: string) => {
    return name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("");
};

export const registerUserService = async (data: RegisterUserType) => {
    const isUserExists = await findUserByEmail(data.email);

    if (isUserExists) {
        throw new ApiError(StatusCodes.CONFLICT, "User already exists");
    }

    const initial = generateInitials(data.name);

    const hashedPassword = await hashData(data.password);

    const user = await prisma.user.create({
        data: {
            ...data,
            initials: initial,
            password: hashedPassword,
        },
        select: {
            createdAt: true,
            email: true,
            name: true,
            updatedAt: true,
            id: true,
            initials: true,
            image: true,
        },
    });

    const { accessToken, refreshToken } = generateAuthTokens({
        id: user.id,
        email: user.email,
    });

    await redis.setex(generateRefreshTokenKey(user.id), env.REFRESH_TOKEN_EXPIRATION, refreshToken);

    return {
        user,
        token: {
            accessToken,
            refreshToken,
        },
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
        id: user.id,
        email: user.email,
    });

    const { password: _password, ...userWithoutPassword } = user;

    await redis.set(generateRefreshTokenKey(user.id), refreshToken);

    return {
        user: userWithoutPassword,
        token: {
            accessToken,
            refreshToken,
        },
    };
};

export const refreshTokenService = async (refreshToken: string) => {
    const decoded = verifyToken(refreshToken, "refresh_token");

    if (!decoded) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const userExists = await findUserByEmail(decoded.email);

    if (!userExists) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const key = generateRefreshTokenKey(decoded.id);
    const cachedRefreshToken = await redis.get(key);

    if (!cachedRefreshToken || refreshToken !== cachedRefreshToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const { accessToken } = generateAuthTokens({
        id: decoded.id,
        email: decoded.email,
    });

    return {
        accessToken,
    };
};

export const userLogoutService = async (refreshToken: string) => {
    const decoded = verifyToken(refreshToken, "refresh_token");

    if (!decoded || !decoded.id) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const key = generateRefreshTokenKey(decoded.id);
    await redis.del(key);
};
