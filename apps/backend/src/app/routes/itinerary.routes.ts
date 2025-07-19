import { Router } from "express";

import { addItinerarySchema } from "@/validations/itinerary.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import { addItineraryHandler, getAllItinerariesHandler } from "@/controllers/itinerary.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(addItinerarySchema), addItineraryHandler);

router.get("/trip/:tripId", verifyAuth, getAllItinerariesHandler);

export const itineraryRouter = router;
