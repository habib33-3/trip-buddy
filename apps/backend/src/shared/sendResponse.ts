import type { Request, Response } from "express";

import type { ApiResponse } from "@/types";

const sendResponse = <T>(req: Request, res: Response, payload: ApiResponse<T>): Response => {
    const { data, message, meta, statusCode, success } = payload;

    return res.status(statusCode).json({
        data: data ?? null,
        message: message ?? null,
        meta: meta ?? null,
        path: req.originalUrl,
        statusCode,
        success,
        timestamp: new Date().toISOString(), // Useful for tracing
    });
};

export default sendResponse;
