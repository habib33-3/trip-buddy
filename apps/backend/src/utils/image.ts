import type { DeleteApiResponse } from "cloudinary";
import { StatusCodes } from "http-status-codes";

import { env } from "@/config/env.config";

import { cloudinary } from "@/lib/cloudinary";

import ApiError from "@/shared/ApiError";
import { logger } from "@/shared/logger";

import type { FoldersOptions } from "@/types";

const generateFolderName = (options: FoldersOptions) => {
    let folderPath: string;

    switch (options.type) {
        case "avatars":
            folderPath = options.userId;
            break;
        case "place":
            folderPath = options.placeId;
            break;
        case "trip-covers":
        case "trip":
            folderPath = options.tripId;
            break;
        default:
            throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid folder type");
    }

    return `${env.APP_NAME}/${options.type}/${folderPath}`;
};

export const uploadImageToCloudinary = async (
    foldersOptions: FoldersOptions,
    file?: Express.Multer.File
): Promise<{ publicId: string; imageUrl: string }> => {
    if (!file?.buffer || !file.mimetype) {
        throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid file");
    }

    const folderName = generateFolderName(foldersOptions);

    try {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        const res = await cloudinary.uploader.upload(base64, {
            folder: folderName,
        });

        return {
            imageUrl: res.secure_url,
            publicId: res.public_id,
        };
    } catch (error) {
        logger.error(
            `Error uploading image: ${error instanceof Error ? error.message : String(error)}`
        );
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Image upload failed");
    }
};

export const deleteImageFromCloudinary = async (publicId: string) => {
    try {
        const res = (await cloudinary.uploader.destroy(publicId)) as DeleteApiResponse;

        if (res.message !== "ok") {
            throw new ApiError(StatusCodes.NOT_FOUND, "Image not found");
        }

        return true;
    } catch (error) {
        logger.error(
            `Error deleting image: ${error instanceof Error ? error.message : String(error)}`
        );
        throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Image deletion failed");
    }
};
