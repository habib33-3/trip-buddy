import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { AddPlaceSchemaType } from "@/validations/places.validations";

import {
    addPlaceService,
    getPlacesService,
    getSinglePlaceService,
} from "@/services/place.services";

export const addPlaceHandler = asyncHandler(
    async (req: Request<{}, {}, AddPlaceSchemaType>, res) => {
        const result = await addPlaceService(req.body);

        sendResponse(req, res, {
            data: result,
            message: "Place added successfully",
            statusCode: StatusCodes.CREATED,
            success: true,
        });
    }
);

export const getPlacesHandler = asyncHandler(
    async (
        req: Request<
            {},
            {},
            {},
            {
                searchQuery?: string;
            }
        >,
        res
    ) => {
        const { searchQuery } = req.query;

        const result = await getPlacesService(searchQuery);

        sendResponse(req, res, {
            data: result,
            message: "Places fetched successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);

export const getSinglePlaceHandler = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const placeId = req.params.id;

    const result = await getSinglePlaceService(placeId);

    sendResponse(req, res, {
        data: result,
        message: "Place fetched successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const getPlacesByTripHandler = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const tripId = req.params.id;

    const result = await getPlacesService(tripId);

    sendResponse(req, res, {
        data: result,
        message: "Places fetched successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});
