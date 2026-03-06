import { prisma } from "../../config/prisma.js";
import { stripe } from "../../config/stripe.js";
import { env } from "../../config/env.js";
export const startFreeTrial = async (userId: string) => {
    const trialEnds = new Date();
    trialEnds.setDate(trialEnds.getDate() + 14);
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    if (!user) throw new Error();
    await prisma.user.update({
        where: { id: userId },
        data: {
            plan: "pro",
            trialEndsAt: trialEnds,
        },
    });
    return {
        trialEndsAt: trialEnds,
        message: "Free trial started",
    };
}
export const createcheckoutSession = async (userId: string) => {

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) throw new Error();

    let customerId = user.stripeCustomerId;
    // Create Stripe customer if doesn't exist
    if (!customerId) {
        const customer = await stripe.customers.create({
            email: user.email,
        });

        customerId = customer.id;

        await prisma.user.update({
            where: { id: userId },
            data: { stripeCustomerId: customerId },
        });
    }

    const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customerId,
        line_items: [
            {
                price: env.STRIPE.STRIPE_PRICE_ID!, // your recurring price ID
                quantity: 1,
            },
        ],
        success_url: `${env.FRONTEND_URL}/dashboard?success=true`,
        cancel_url: `${env.FRONTEND_URL}/pricing?canceled=true`,
    });
    return session

}
export const openPortal = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.stripeCustomerId)
        throw new Error();

    const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: env.FRONTEND_URL + "/dashboard",
    });
    return session;
}