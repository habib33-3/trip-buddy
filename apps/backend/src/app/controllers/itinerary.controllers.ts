import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { AddItinerarySchemaType } from "@/validations/itinerary.validations";

import { addItineraryService, getAllItinerariesService } from "@/services/itinerary.services";

export const addItineraryHandler = asyncHandler(
    async (req: Request<{}, {}, AddItinerarySchemaType>, res) => {
        const userId = req.user?.id as string;
        const payload = req.body;

        const itinerary = await addItineraryService(payload, userId);

        sendResponse(req, res, {
            data: itinerary,
            message: "Itinerary added successfully",
            statusCode: StatusCodes.CREATED,
            success: true,
        });
    }
);

export const getAllItinerariesHandler = asyncHandler(
    async (req: Request<{ tripId: string }>, res) => {
        const { tripId } = req.params;
        const userId = req.user?.id as string;

        const Itineraries = await getAllItinerariesService(tripId, userId);

        sendResponse(req, res, {
            data: Itineraries,
            message: "Itineraries fetched successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);
