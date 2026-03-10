import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { upload } from "../../middleware/upload.js";
import * as settingsController from "./settings.controller.js";

const settingsRoutes = Router();

settingsRoutes.get("/settings", requireAuth, settingsController.getSettings);
settingsRoutes.post("/settings/logo", requireAuth, upload.single("logo"), settingsController.uploadLogoController);
settingsRoutes.put("/settings", requireAuth, settingsController.updateSettingsController);
settingsRoutes.delete("/settings/account", requireAuth, settingsController.deleteAccountController);
export default settingsRoutes;