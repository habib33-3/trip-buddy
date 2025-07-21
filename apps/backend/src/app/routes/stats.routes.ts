import { Router } from "express";

import verifyAuth from "@/middlewares/verifyAuth";

import { getUserStatisticsHandler } from "@/controllers/stats.controllers";

const router = Router();

router.get("/", verifyAuth, getUserStatisticsHandler);

export const statsRouter = router;
