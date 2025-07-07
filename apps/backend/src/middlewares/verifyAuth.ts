import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import { verifyToken } from "@/utils/jwt";

import ApiError from "@/shared/ApiError";
import { ACCESS_TOKEN_COOKIE_NAME } from "@/shared/constants";

const verifyAuth = (req: Request, _res: Response, next: NextFunction): void => {
    // eslint-disable-next-line security/detect-object-injection
    const token = req.cookies[ACCESS_TOKEN_COOKIE_NAME] as string;

    if (!token) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized");
    }

    try {
        const decoded = verifyToken(token, "access_token");

        req.user = decoded;
        next();
    } catch (_err) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized token");
    }
};

export default verifyAuth;
