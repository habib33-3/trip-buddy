import type { NextFunction, Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import sendResponse from "@/shared/sendResponse";

const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    sendResponse(req, res, {
        data: null,
        message: "Route not found",
        statusCode: StatusCodes.NOT_FOUND,
        success: false,
    });

    next();
};

export default notFoundMiddleware;
