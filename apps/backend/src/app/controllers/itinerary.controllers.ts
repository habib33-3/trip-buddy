import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type {
    AddItinerarySchemaType,
    ChangeItineraryStatusSchemaType,
    UpdateItinerarySchemaType,
} from "@/validations/itinerary.validations";

import {
    addItineraryService,
    changeItineraryStatusService,
    deleteItineraryService,
    getAllItinerariesService,
    getItineraryByIdService,
    updateItineraryService,
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

export const getSingleItineraryHandler = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const itineraryId = req.params.id;
    const userId = req.user?.id as string;

    const result = await getItineraryByIdService(itineraryId, userId);

    sendResponse(req, res, {
        data: result,
        message: "Itinerary fetched successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const updateItineraryHandler = asyncHandler(
    async (req: Request<{ id: string }, {}, UpdateItinerarySchemaType>, res) => {
        const itineraryId = req.params.id;
        const userId = req.user?.id as string;
        const payload = req.body;

        const result = await updateItineraryService(itineraryId, payload, userId);

        sendResponse(req, res, {
            data: result,
            message: "Itinerary updated successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);

export const deleteItineraryHandler = asyncHandler(async (req: Request<{ id: string }>, res) => {
    const itineraryId = req.params.id;
    const userId = req.user?.id as string;

    const result = await deleteItineraryService(itineraryId, userId);

    sendResponse(req, res, {
        data: result,
        message: "Itinerary deleted successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const changeItineraryStatusHandler = asyncHandler(
    async (req: Request<{ id: string }, {}, ChangeItineraryStatusSchemaType>, res) => {
        const itineraryId = req.params.id;
        const userId = req.user?.id as string;

        const result = await changeItineraryStatusService(itineraryId, req.body, userId);

        sendResponse(req, res, {
            data: result,
            message: "Itinerary status changed successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);
