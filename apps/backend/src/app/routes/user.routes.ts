import { Router } from "express";

import { changeUserPasswordSchema } from "@/validations/user.validations";

import uploadImage from "@/middlewares/upload-image.middlewares";
import validationMiddleware from "@/middlewares/validation.middleware";
import verifyAuth from "@/middlewares/verifyAuth";

import { changeUserAvatarHandler, changeUserPasswordHandler } from "@/controllers/user.controllers";

const router = Router();

router.put("/change-avatar", verifyAuth, uploadImage.single("avatar"), changeUserAvatarHandler);

router.put(
    "/change-password",
    verifyAuth,
    validationMiddleware(changeUserPasswordSchema),
    changeUserPasswordHandler
);

export const userRouter = router;
