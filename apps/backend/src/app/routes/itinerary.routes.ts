import { Router } from "express";

import { addItinerarySchema, reorderItinerarySchema } from "@/validations/itinerary.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import {
    addItineraryHandler,
    getAllItinerariesHandler,
    reorderItineraryHandler,
} from "@/controllers/itinerary.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(addItinerarySchema), addItineraryHandler);

router.get("/trip/:tripId", verifyAuth, getAllItinerariesHandler);

router.put(
    "/reorder",
    verifyAuth,
    validationMiddleware(reorderItinerarySchema),
    reorderItineraryHandler
);

export const itineraryRouter = router;
