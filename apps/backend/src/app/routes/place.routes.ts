import { Router } from "express";

import verifyAuth from "@/middlewares/verifyAuth";

import {
    addPlaceHandler,
    getPlacesByTripHandler,
    getPlacesHandler,
    getSinglePlaceHandler,
} from "@/controllers/place.controllers";

const router = Router();

router.post("/", verifyAuth, addPlaceHandler);

router.get("/", verifyAuth, getPlacesHandler);

router.get("/trip/:id", verifyAuth, getPlacesByTripHandler);

router.get("/:id", verifyAuth, getSinglePlaceHandler);

export const placeRouter = router;
