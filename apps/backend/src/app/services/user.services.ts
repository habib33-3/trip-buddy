import { StatusCodes } from "http-status-codes";

import { prisma } from "@/lib/prisma";

import { cacheGet, cacheInvalidate, cacheRefreshTTL, cacheSet } from "@/utils/cache";
import { cacheKeyUser, cacheKeyUserEmail } from "@/utils/cache-key";
import { compareHashData, hashData } from "@/utils/hash";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "@/utils/image";

import ApiError from "@/shared/ApiError";
import { logger } from "@/shared/logger";

import type { ChangeUserPasswordSchemaType } from "@/validations/user.validations";

import type { User } from "@/generated/prisma";

export const findUserByEmailService = async (email: string) => {
    const cachedUser = await cacheGet<User>(cacheKeyUserEmail(email));

    if (cachedUser) {
        await cacheRefreshTTL(cacheKeyUserEmail(email));
        return cachedUser;
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
        await cacheSet(cacheKeyUserEmail(email), user);
    }

    return user;
};

export const findUserByIdService = async (id: string) => {
    const key = cacheKeyUser(id);

    const cachedUser = await cacheGet<User>(key);
    if (cachedUser) {
        await cacheRefreshTTL(key);
        return cachedUser;
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
        await cacheSet(key, user);
    }

    return user;
};

export const updateUserAvatarService = async (userId: string, image?: Express.Multer.File) => {
    const user = await findUserByIdService(userId);

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    if (user.imagePublicId) {
        try {
            await deleteImageFromCloudinary(user.imagePublicId);
        } catch (err) {
            logger.warn(
                `Failed to delete old avatar for user ${userId}: ${err instanceof Error ? err.message : String(err)}, `
            );
        }
    }

    const { imageUrl, publicId } = await uploadImageToCloudinary(
        { type: "avatars", userId },
        image
    );

    const updatedUser = await prisma.user.update({
        data: { image: imageUrl, imagePublicId: publicId },
        where: { id: userId },
    });

    await cacheInvalidate(cacheKeyUser(userId));

    return updatedUser;
};

export const changeUserPasswordService = async (
    payload: ChangeUserPasswordSchemaType,
    userId: string
) => {
    const { currentPassword, newPassword } = payload;

    const user = await findUserByIdService(userId);

    if (!user) {
        throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
    }

    const isPasswordMatch = await compareHashData(user.password, currentPassword);

    if (!isPasswordMatch) {
        throw new ApiError(StatusCodes.UNAUTHORIZED, "Current password is incorrect");
    }

    const hashedPassword = await hashData(newPassword);

    return prisma.user.update({
        data: { password: hashedPassword },
        omit: { password: true },
        where: { id: userId },
    });
};
