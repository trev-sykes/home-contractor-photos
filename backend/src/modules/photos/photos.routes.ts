import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { requireSubscription } from "../../middleware/subscription.js";
import { upload } from "../../middleware/upload.js";
import * as photosController from "./photos.controller.js";

const photosRoutes = Router();

photosRoutes.post(
    "/customers/:customerId/projects/:projectId/photos",
    requireAuth,
    requireSubscription,
    upload.single("photo"),
    photosController.uploadPhotoController
);

photosRoutes.delete(
    "/customers/:customerId/projects/:projectId/photos/:photoId",
    requireAuth,
    requireSubscription,
    photosController.deletePhotoController
);

photosRoutes.get("/photos", requireAuth, photosController.getAllPhotosController);

export default photosRoutes;