import { createRequire } from "module";
import type { Request } from "express";

const require = createRequire(import.meta.url);
const multer = require("multer");

export const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (_: Request, file: any, cb: any) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only image files are allowed"));
    },
});