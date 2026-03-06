import multer, { type FileFilterCallback } from "multer";
import type { Request } from "express";

// Store in memory so we can stream directly to Cloudinary
export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
    fileFilter: (_: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed"));
    },
});