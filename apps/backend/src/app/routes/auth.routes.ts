import { Router } from "express";

import { loginUserSchema, registerUserSchema } from "@/validations/auth.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import {
    registerUserHandler,
    userLoginHandler,
    userLogoutHandler,
    userRefreshTokenHandler,
} from "@/controllers/auth.controllers";

const router = Router();

router.post("/register", validationMiddleware(registerUserSchema), registerUserHandler);

router.post("/login", validationMiddleware(loginUserSchema), userLoginHandler);

router.post("/logout", verifyAuth, userLogoutHandler);

router.post("/refresh-token", userRefreshTokenHandler);

export const authRouter = router;
