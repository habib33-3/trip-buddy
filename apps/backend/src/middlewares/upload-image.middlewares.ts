import path from "node:path";

import { StatusCodes } from "http-status-codes";
import multer from "multer";

import ApiError from "@/shared/ApiError";

const storage = multer.memoryStorage();

const uploadImage = multer({
    fileFilter(_req, file, cb) {
        const filetypes = /jpeg|jpg|png|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            cb(null, true);
            return;
        }
        cb(new ApiError(StatusCodes.BAD_REQUEST, "Invalid file type"));
    },
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    limits: { fileSize: 5 * 1024 * 1024 },
    storage,
});

export default uploadImage;
