import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import { verifyToken } from "@/utils/jwt";

import { ACCESS_TOKEN_COOKIE_NAME } from "@/shared/constants";

const verifyAuth = (req: Request, res: Response, next: NextFunction): void => {
    // eslint-disable-next-line security/detect-object-injection
    const token = req.cookies[ACCESS_TOKEN_COOKIE_NAME] as string;

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Unauthorized",
        });
        return;
    }

    try {
        const decoded = verifyToken(token, "access_token");
        req.user = decoded;
        next();
    } catch (_err) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default verifyAuth;
