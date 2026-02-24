import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import { requireSubscription } from "../../middleware/subscription.js";
import * as dashboardController from "./dashboard.controller.js";

const dashboardRoutes = Router();

dashboardRoutes.get("/dashboard", requireAuth, requireSubscription, dashboardController.getDashboardController);

export default dashboardRoutes;