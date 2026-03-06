// eslint-disable-next-line @typescript-eslint/no-require-imports
const multer = require("multer");
import type { Request, Response, NextFunction } from "express";

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_: Request, file: any, cb: any) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed"));
    },
});