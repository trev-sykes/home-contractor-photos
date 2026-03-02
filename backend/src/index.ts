import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes.js";
import customersRoutes from "./modules/customers/customers.routes.js";
import projectsRoutes from "./modules/projects/projects.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import billingRoutes from "./modules/billing/billing.routes.js";
import welcomeRoutes from "./modules/welcome/welcome.routes.js";
import { handleStripeWebhook } from "./modules/billing/billing.webhooks.js";

const app = express();

const origin = process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL_PROD
    : process.env.FRONTEND_URL_LOCAL;

if (!origin) throw new Error("Frontend URL not defined in .env");

app.use(cors({
    origin,
    credentials: true
}));

app.post(
    "/webhooks/stripe",
    express.raw({ type: "application/json" }),
    handleStripeWebhook
);

app.use(express.json());


app.use("/api", authRoutes);
app.use("/api", customersRoutes);
app.use("/api", projectsRoutes);
app.use("/api", dashboardRoutes);
app.use("/api", billingRoutes);
app.use("/api", welcomeRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));