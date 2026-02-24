import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import * as billingController from "./billing.controller.js";

const billingRoutes = Router();

billingRoutes.post("/free-trial", requireAuth, billingController.startFreeTrialController);
billingRoutes.post("/portal", requireAuth, billingController.portalController);


export default billingRoutes