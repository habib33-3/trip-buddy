import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import { deleteCookie, setCookie } from "@/utils/cookie";

import ApiError from "@/shared/ApiError";
import asyncHandler from "@/shared/asyncHandler";
import { ACCESS_TOKEN_COOKIE_NAME, REFRESH_TOKEN_COOKIE_NAME } from "@/shared/constants";
import sendResponse from "@/shared/sendResponse";

import type { LoginUserType, RegisterUserType } from "@/validations/auth.validations";

import {
    refreshTokenService,
    registerUserService,
    userLoginService,
    userLogoutService,
} from "@/services/auth.services";

export const registerUserHandler = asyncHandler(
    async (req: Request<{}, {}, RegisterUserType>, res) => {
        const payload = req.body;

        const result = await registerUserService(payload);

        setCookie(res, ACCESS_TOKEN_COOKIE_NAME, result.token.accessToken);
        setCookie(res, REFRESH_TOKEN_COOKIE_NAME, result.token.refreshToken);

        sendResponse(req, res, {
            data: result.user,
            message: "User created successfully",
            statusCode: StatusCodes.CREATED,
            success: true,
        });
    }
);

export const userLoginHandler = asyncHandler(async (req: Request<{}, {}, LoginUserType>, res) => {
    const { email, password } = req.body;

    const result = await userLoginService(email, password);

    setCookie(res, ACCESS_TOKEN_COOKIE_NAME, result.token.accessToken);
    setCookie(res, REFRESH_TOKEN_COOKIE_NAME, result.token.refreshToken);

    sendResponse(req, res, {
        data: result.user,
        message: "User login successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const userRefreshTokenHandler = asyncHandler(async (req, res) => {
    // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME] as string;

    if (!refreshToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    const result = await refreshTokenService(refreshToken);

    setCookie(res, ACCESS_TOKEN_COOKIE_NAME, result.accessToken);

    sendResponse(req, res, {
        message: "User refresh token successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const userLogoutHandler = asyncHandler(async (req, res) => {
    // eslint-disable-next-line security/detect-object-injection, @typescript-eslint/no-unsafe-member-access
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME] as string;

    if (!refreshToken) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized or session expired");
    }

    await userLogoutService(refreshToken);

    deleteCookie(res, ACCESS_TOKEN_COOKIE_NAME);
    deleteCookie(res, REFRESH_TOKEN_COOKIE_NAME);

    sendResponse(req, res, {
        message: "User logout successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});
