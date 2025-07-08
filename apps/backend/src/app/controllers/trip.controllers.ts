import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { CreateTripSchemaType } from "@/validations/trip.validations";

import { createTripService, getAllTripsService } from "@/services/trip.services";

export const createTripHandler = asyncHandler(
    async (req: Request<{}, {}, CreateTripSchemaType>, res) => {
        const userId = req?.user?.id as string;

        const result = await createTripService(req.body, userId);

        sendResponse(req, res, {
            statusCode: StatusCodes.CREATED,
            success: true,
            message: "Trip created successfully",
            data: result,
        });
    }
);

export const getAllTripsHandler = asyncHandler(async (req, res) => {
    const userId = req?.user?.id as string;

    const result = await getAllTripsService(userId);

    sendResponse(req, res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: "Trips fetched successfully",
        data: result,
    });
});
