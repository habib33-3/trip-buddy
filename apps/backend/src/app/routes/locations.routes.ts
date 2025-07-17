import { Router } from "express";

import { addLocationSchema } from "@/validations/locations.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import { addLocationHandler, getLocationsHandler } from "@/controllers/locations.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(addLocationSchema), addLocationHandler);

router.get("/trip/:id", verifyAuth, getLocationsHandler);

export const locationsRouter = router;
