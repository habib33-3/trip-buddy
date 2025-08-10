import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import { env } from "@/config/env.config";

import { logger } from "@/shared/logger";

import globalErrorMiddleware from "@/middlewares/global-error.middleware";
import notFoundMiddleware from "@/middlewares/not-found.middleware";
import limiter from "@/middlewares/rate-limiter";

import router from "./routes/router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: env.ALLOWED_CORS_ORIGIN,
    })
);
app.use(helmet());
app.use(limiter);

app.use(logger.middleware);

app.use("/api/v1", router);

app.use(globalErrorMiddleware);

app.use(notFoundMiddleware);

export default app;
