import { prisma } from "../../config/prisma.js";
import { stripe } from "../../config/stripe.js";

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

export const openPortal = async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user?.stripeCustomerId)
        throw new Error();

    const session = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId,
        return_url: process.env.FRONTEND_URL + "/dashboard",
    });
    return session;
}