import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import customersRoutes from "./modules/customers/customers.routes.js";
import projectsRoutes from "./modules/projects/projects.routes.js";
import photosRoutes from "./modules/photos/photos.routes.js";
import shareRoutes from "./modules/share/share.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import billingRoutes from "./modules/billing/billing.routes.js";
import welcomeRoutes from "./modules/welcome/welcome.routes.js";
import settingsRoutes from "./modules/settings/settings.routes.js";
import { handleStripeWebhook } from "./modules/billing/billing.webhooks.js";
import { env } from "./config/env.js";

const app = express();

const origin = env.FRONTEND_URL;
if (!origin) throw new Error("Frontend URL not defined in .env");

app.use(
    cors({
        origin: [env.FRONTEND_URL, "http://localhost:3000"],
        credentials: true
    })
);
app.post(
    "/webhooks/stripe",
    express.raw({ type: "application/json" }),
    handleStripeWebhook
);

app.use(express.json());


app.use("/api", authRoutes);
app.use("/api", customersRoutes);
app.use("/api", projectsRoutes);
app.use("/api", photosRoutes);
app.use("/api", shareRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", billingRoutes);
app.use("/api", welcomeRoutes);
app.use("/api", settingsRoutes);

app.listen(env.PORT, () => console.log(`Server running on port ${env.PORT}`));