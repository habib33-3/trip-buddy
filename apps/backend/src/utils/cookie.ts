import type { Response } from "express";

import { env } from "@/config/env.config";

export const setCookie = (res: Response, cookieName: string, cookieValue: string) => {
    const isProduction = env.NODE_ENV === "production";

    res.cookie(cookieName, cookieValue, {
        httpOnly: true,
        maxAge: env.ACCESS_TOKEN_EXPIRATION,
        path: "/", // explicitly set path
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction, // false on localhost
    });
};

export const deleteCookie = (res: Response, cookieName: string) => {
    const isProduction = env.NODE_ENV === "production";

    res.clearCookie(cookieName, {
        httpOnly: true,
        path: "/", // must match the original cookie path
        sameSite: isProduction ? "none" : "lax",
        secure: isProduction,
    });
};
