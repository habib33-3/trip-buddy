import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

import globalErrorMiddleware from "@/middlewares/global-error.middleware";
import notFoundMiddleware from "@/middlewares/not-found.middleware";
import limiter from "@/middlewares/rate-limiter";

import router from "./routes/router";

const app = express();

// ---------- Core Middlewares ----------
app.use(express.json({ limit: "1mb" })); // Protect against large payloads
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());

// ---------- Security Middlewares ----------
app.use(
    cors({
        credentials: true,
        origin: env.ALLOWED_CORS_ORIGIN,
    })
);
app.use(helmet());
app.use(limiter);

// ---------- Logging ----------
app.use(logger.middleware);

// ---------- Health Check ----------
app.get("/health", (_req, res) => {
    res.sendStatus(StatusCodes.OK);
});

// ---------- API Routes ----------
app.use("/api/v1", router);

app.use(globalErrorMiddleware);
app.use(notFoundMiddleware);

export default app;
