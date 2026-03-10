import { env } from "../../config/env.js";
import type { Request, Response } from "express";
import { stripe } from "../../config/stripe.js";
import { prisma } from "../../config/prisma.js";
import { sendSubscriptionConfirmedEmail } from "../email/email.service.js";

export const handleStripeWebhook = async (
    req: Request,
    res: Response
) => {
    const sig = req.headers["stripe-signature"];

    if (!sig) {
        return res.status(400).send("Missing stripe signature");
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            env.STRIPE.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("Webhook signature verification failed.");
        return res.status(400).send("Invalid signature");
    }

    try {
        switch (event.type) {
            case "checkout.session.completed":
                await handleCheckoutCompleted(event.data.object);
                break;
            case "invoice.payment_succeeded":
                await handlePaymentSucceeded(event.data.object);
                break;
            case "customer.subscription.updated":
            case "customer.subscription.deleted":
                await handleSubscriptionUpdate(event.data.object);
                break;

            case "invoice.payment_failed":
                await handlePaymentFailed(event.data.object);
                break;
        }

        res.json({ received: true });
    } catch (err) {
        console.error("Webhook handler error:", err);
        res.status(500).send("Webhook handler failed");
    }
};

const handleCheckoutCompleted = async (session: any) => {
    if (session.mode !== "subscription") return;

    const subscriptionId = session.subscription;
    const customerId = session.customer;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const user = await prisma.user.update({
        where: { stripeCustomerId: customerId },
        data: {
            subscriptionId: subscription.id,
            subscriptionStatus: subscription.status,
            plan: "pro",
        },
    });
    await sendSubscriptionConfirmedEmail(user.email, user.companyName);
};
const handleSubscriptionUpdate = async (subscription: any) => {
    await prisma.user.update({
        where: { stripeCustomerId: subscription.customer },
        data: {
            subscriptionStatus: subscription.status,
            plan: subscription.status === "active" ? "pro" : "free",
        },
    });
};

const handlePaymentFailed = async (invoice: any) => {
    const customerId = invoice.customer;

    await prisma.user.update({
        where: { stripeCustomerId: customerId },
        data: {
            subscriptionStatus: "past_due",
        },
    });
};

const handlePaymentSucceeded = async (invoice: any) => {
    if (invoice.billing_reason === "subscription_create") return; // handled by checkout.session.completed already
    await prisma.user.update({
        where: { stripeCustomerId: invoice.customer },
        data: { subscriptionStatus: "active" },
    });
};