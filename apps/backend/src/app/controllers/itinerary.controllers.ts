import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type {
    AddItinerarySchemaType,
    ReorderItinerarySchemaType,
} from "@/validations/itinerary.validations";

import {
    addItineraryService,
    getAllItinerariesService,
    reorderItineraryService,
} from "@/services/itinerary.services";

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

export const reorderItineraryHandler = asyncHandler(
    async (req: Request<{}, {}, ReorderItinerarySchemaType>, res) => {
        const userId = req.user?.id as string;
        const payload = req.body;

        const updatedItinerary = await reorderItineraryService(payload, userId);

        sendResponse(req, res, {
            data: updatedItinerary,
            message: "Itinerary reordered successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);
