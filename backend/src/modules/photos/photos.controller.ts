import type { Request, Response } from "express";

import { uploadPhoto, deletePhoto } from "./photos.service.js";
type MulterRequest = Request & { file?: Express.Multer.File };
export const uploadPhotoController = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });

    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file provided" });

    let { customerId, projectId } = req.params;
    const { type } = req.body;

    const customerIdParam = Array.isArray(customerId) ? customerId[0] : customerId;
    const projectIdParam = Array.isArray(projectId) ? projectId[0] : projectId;

    if (!customerIdParam || !projectIdParam) {
        return res.status(400).json({ error: "Missing customerId or projectId" });
    }

    if (!["before", "after", "progress"].includes(type)) {
        return res.status(400).json({ error: "Invalid photo type" });
    }

    try {
        const photo = await uploadPhoto(req.userId, customerIdParam, projectIdParam, file, type);
        if (!photo) return res.status(404).json({ error: "Project not found" });
        res.json(photo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Upload failed" });
    }
};
export const deletePhotoController = async (req: Request, res: Response) => {
    if (!req.userId) return res.status(401).json({ error: "Unauthorized" });
    let { customerId, photoId } = req.params;
    const customerIdParam = Array.isArray(customerId) ? customerId[0] : customerId;
    const photoIdParam = Array.isArray(photoId) ? photoId[0] : photoId;

    if (!customerIdParam || !photoIdParam) {
        return res.status(400).json({ error: "Missing customerId or projectId" });
    }

    try {
        const result = await deletePhoto(req.userId, customerIdParam, photoIdParam);
        if (!result) return res.status(404).json({ error: "Photo not found" });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
};