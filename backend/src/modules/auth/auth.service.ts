import { env } from "../../config/env.js";
import { prisma } from "../../config/prisma.js";
import { stripe } from "../../config/stripe.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const me = async (userId: string) => {

    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            companyName: true,
            subscriptionStatus: true,
            trialEndsAt: true,
            plan: true,
        }
    });
}

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
        { userId: user.id },
        env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    return token;
};

export const register = async (email: string, password: string, companyName: string) => {
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashed, companyName },
    });
    // 2️⃣ Create the Stripe customer
    const customer = await stripe.customers.create({
        email: user.email,
        name: companyName, // optional but recommended
    });

    // 3️⃣ Save the Stripe customer ID in your DB
    await prisma.user.update({
        where: { id: user.id },
        data: { stripeCustomerId: customer.id },
    });

    return { user, customer };
}