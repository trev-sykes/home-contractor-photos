import { Router } from "express";
import * as shareController from "./share.controller.js";

const shareRoutes = Router();

// Public — no requireAuth
shareRoutes.get("/share/:token", shareController.getSharePage);

export default shareRoutes;