import { Router } from "express";

import {
    addItinerarySchema,
    changeItineraryStatusSchema,
    updateItinerarySchema,
} from "@/validations/itinerary.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import {
    addItineraryHandler,
    changeItineraryStatusHandler,
    deleteItineraryHandler,
    getAllItinerariesHandler,
    getSingleItineraryHandler,
    updateItineraryHandler,
} from "@/controllers/itinerary.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(addItinerarySchema), addItineraryHandler);

router.get("/trip/:tripId", verifyAuth, getAllItinerariesHandler);

router.get("/:id", verifyAuth, getSingleItineraryHandler);

router.put(
    "/:id/change-status",
    verifyAuth,
    validationMiddleware(changeItineraryStatusSchema),
    changeItineraryStatusHandler
);

router.delete("/:id", verifyAuth, deleteItineraryHandler);

router.put("/:id", verifyAuth, validationMiddleware(updateItinerarySchema), updateItineraryHandler);

export const itineraryRouter = router;
