import type { Response } from "express";

import { env } from "@/config/env.config";

export const setCookie = (res: Response, cookieName: string, cookieValue: string) => {
    const isProduction = env.NODE_ENV === "production";

    res.cookie(cookieName, cookieValue, {
        httpOnly: true,
        maxAge: env.ACCESS_TOKEN_EXPIRATION,
        path: "/",
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    });
};

export const deleteCookie = (res: Response, cookieName: string) => {
    const isProduction = env.NODE_ENV === "production";

    res.clearCookie(cookieName, {
        httpOnly: true,
        path: "/",
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    });
};
