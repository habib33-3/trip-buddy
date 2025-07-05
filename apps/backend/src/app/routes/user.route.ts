import { Router } from "express";

import { loginUserSchema, registerUserSchema } from "@/validations/user.validations";

import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import {
    registerUserHandler,
    userLoginHandler,
    userLogoutHandler,
    userRefreshTokenHandler,
} from "@/controllers/user.controllers";

const router = Router();

router.post("/register", validationMiddleware(registerUserSchema), registerUserHandler);

router.post("/login", validationMiddleware(loginUserSchema), userLoginHandler);

router.post("/logout", verifyAuth, userLogoutHandler);

router.post("/refresh-token", verifyAuth, userRefreshTokenHandler);

export const userRouter = router;
