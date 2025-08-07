import { Router } from "express";

import {
    changeTripStatusSchema,
    createTripSchema,
    updateTripSchema,
} from "@/validations/trip.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import {
    changeTripStatusHandler,
    createTripHandler,
    deleteTripHandler,
    getAllTripsHandler,
    getRecentTripsHandler,
    getSingleTripHandler,
    updateTripHandler,
} from "@/controllers/trip.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(createTripSchema), createTripHandler);

router.get("/", verifyAuth, getAllTripsHandler);

router.get("/recent", verifyAuth, getRecentTripsHandler);

router.get("/:id", verifyAuth, getSingleTripHandler);

router.put(
    "/:id/change-status",
    verifyAuth,
    validationMiddleware(changeTripStatusSchema),
    changeTripStatusHandler
);

router.put("/:id", verifyAuth, validationMiddleware(updateTripSchema), updateTripHandler);

router.delete("/:id", verifyAuth, deleteTripHandler);

export const tripRouter = router;
