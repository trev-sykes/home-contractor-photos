import { Router } from "express";
import { requireAuth } from "../../middleware/auth.js";
import * as authController from "./auth.controller.js";

const authRoutes = Router();

authRoutes.get("/me", requireAuth, authController.meController);

authRoutes.post("/login", authController.loginController);

authRoutes.post("/register", authController.registerController);


export default authRoutes
