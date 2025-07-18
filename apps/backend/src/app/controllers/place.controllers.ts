import type { Request } from "express";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { AddPlaceSchemaType } from "@/validations/place.validations";

import { addPlaceService, getAllPlaceService } from "@/services/place.services";

export const addPlaceHandler = asyncHandler(
    async (req: Request<{}, {}, AddPlaceSchemaType>, res) => {
        const result = await addPlaceService(req.body.address);

        sendResponse(req, res, {
            data: result,
            message: "Place added successfully",
            statusCode: 201,
            success: true,
        });
    }
);

export const getAllPlaceHandler = asyncHandler(async (req, res) => {
    const result = await getAllPlaceService();

    sendResponse(req, res, {
        data: result,
        message: "Place added successfully",
        statusCode: 201,
        success: true,
    });
});
