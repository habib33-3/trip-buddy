import type { Request } from "express";

import { StatusCodes } from "http-status-codes";

import asyncHandler from "@/shared/asyncHandler";
import sendResponse from "@/shared/sendResponse";

import type { ChangeUserPasswordSchemaType } from "@/validations/user.validations";

import { changeUserPasswordService, updateUserAvatarService } from "@/services/user.services";

export const changeUserAvatarHandler = asyncHandler(async (req, res) => {
    const userId = req.user?.id as string;

    const result = await updateUserAvatarService(userId, req.file);

    sendResponse(req, res, {
        data: result,
        message: "User avatar changed successfully",
        statusCode: StatusCodes.OK,
        success: true,
    });
});

export const changeUserPasswordHandler = asyncHandler(
    async (req: Request<{}, {}, ChangeUserPasswordSchemaType>, res) => {
        const userId = req.user?.id as string;

        const result = await changeUserPasswordService(req.body, userId);

        sendResponse(req, res, {
            data: result,
            message: "User password changed successfully",
            statusCode: StatusCodes.OK,
            success: true,
        });
    }
);
