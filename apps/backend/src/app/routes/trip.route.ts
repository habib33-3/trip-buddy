import { Router } from "express";

import { createTripSchema, updateTripSchema } from "@/validations/trip.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import {
    createTripHandler,
    deleteTripHandler,
    getAllTripsHandler,
    getSingleTripHandler,
    updateTripHandler,
} from "@/controllers/trip.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(createTripSchema), createTripHandler);

router.get("/", verifyAuth, getAllTripsHandler);

router.get("/:id", verifyAuth, getSingleTripHandler);

router.put("/:id", verifyAuth, validationMiddleware(updateTripSchema), updateTripHandler);

router.delete("/:id", verifyAuth, deleteTripHandler);

export const tripRouter = router;
