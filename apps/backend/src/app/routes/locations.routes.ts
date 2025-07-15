import { Router } from "express";

import { addLocationSchema } from "@/validations/locations.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import { addLocationHandler } from "@/controllers/locations.controllers";

const router = Router();

router.post("/", verifyAuth, validationMiddleware(addLocationSchema), addLocationHandler);

export const locationsRouter = router;
