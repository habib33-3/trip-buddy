import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import { getUserStatisticsService } from "@/services/stats.services";

export const getUserStatisticsHandler = asyncHandler(async (req, res) => {
    const userId = req.user?.id as string;

    const result = await getUserStatisticsService(userId);

    sendResponse(req, res, {
        data: result,
        message: "User statistics fetched successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});
