import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type {
    ChangeTripStatusSchemaType,
    CreateTripSchemaType,
    SearchTripParamSchemaType,
    UpdateTripSchemaType,
} from "@/validations/trip.validations";

import {
    changeTripStatusService,
    createTripService,
    deleteTripService,
    getAllTripsService,
    getRecentTripsService,
    getSingleTripService,
    updateTripService,
} from "@/services/trip.services";

export const createTripHandler = asyncHandler(
    async (req: Request<{}, {}, CreateTripSchemaType>, res) => {
        const userId = req.user?.id as string;

        const result = await createTripService(req.body, userId);

        sendResponse(req, res, {
            data: result,
            message: "Trip created successfully",
            statusCode: StatusCodes.CREATED,
            success: true,
        });
    }
);

export const getAllTripsHandler = asyncHandler(
    async (req: Request<{}, {}, {}, SearchTripParamSchemaType>, res) => {
        const userId = req.user?.id as string;

        const searchTripParams = req.query;

        const result = await getAllTripsService(userId, searchTripParams);

        sendResponse(req, res, {
            data: result,
            message: "Trips fetched successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);

export const getRecentTripsHandler = asyncHandler(async (req, res) => {
    const userId = req.user?.id as string;

    const result = await getRecentTripsService(userId);

    sendResponse(req, res, {
        data: result,
        message: "Trips fetched successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const getSingleTripHandler = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const tripId = req.params.id;
    const userId = req.user?.id as string;

    const result = await getSingleTripService(tripId, userId);

    sendResponse(req, res, {
        data: result,
        message: "Trip fetched successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const updateTripHandler = asyncHandler(
    async (req: Request<{ id: string }, {}, UpdateTripSchemaType>, res) => {
        const tripId = req.params.id;
        const userId = req.user?.id as string;

        const result = await updateTripService(tripId, req.body, userId);

        sendResponse(req, res, {
            data: result,
            message: "Trip updated successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);

export const deleteTripHandler = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const tripId = req.params.id;
    const userId = req.user?.id as string;

    await deleteTripService(tripId, userId);

    sendResponse(req, res, {
        message: "Trip deleted successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const changeTripStatusHandler = asyncHandler(
    async (
        req: Request<
            {
                id: string;
            },
            {},
            ChangeTripStatusSchemaType
        >,
        res
    ) => {
        const tripId = req.params.id;
        const userId = req.user?.id as string;

        const result = await changeTripStatusService(tripId, req.body, userId);

        sendResponse(req, res, {
            data: result,
            message: "Trip status changed successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);
