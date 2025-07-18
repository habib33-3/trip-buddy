import { Router } from "express";

import { addPlaceSchema } from "@/validations/place.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import { addPlaceHandler, getAllPlaceHandler } from "@/controllers/place.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(addPlaceSchema), addPlaceHandler);
router.get("/", verifyAuth, getAllPlaceHandler);

export const placeRouter = router;
