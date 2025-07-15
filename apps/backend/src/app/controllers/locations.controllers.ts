import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { AddLocationSchemaType } from "@/validations/locations.validations";

import { addLocationService } from "@/services/locations.services";

export const addLocationHandler = asyncHandler(
    async (req: Request<{}, {}, AddLocationSchemaType>, res) => {
        const userId = req.user?.id as string;

        const result = await addLocationService(req.body, userId);

        sendResponse(req, res, {
            data: result,
            message: "Location added successfully",
            statusCode: StatusCodes.CREATED,
            success: true,
        });
    }
);
