import { Router } from "express";

import { createTripSchema } from "@/validations/trip.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import { createTripHandler, getAllTripsHandler } from "@/controllers/trip.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(createTripSchema), createTripHandler);

router.get("/", verifyAuth, getAllTripsHandler);

export const tripRouter = router;
