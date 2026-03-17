import { env } from "../../config/env.js";
import { prisma } from "../../config/prisma.js";
import { stripe } from "../../config/stripe.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../email/email.service.js";

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
    try {
        const hashed = await bcrypt.hash(password, 10);

        // Set trial end date
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 14);

        // 1️⃣ Create user in Prisma
        let user;
        try {
            user = await prisma.user.create({
                data: {
                    email,
                    password: hashed,
                    companyName,
                    trialEndsAt,
                    subscriptionStatus: "trialing",
                    plan: "pro",
                },
            });
        } catch (err: any) {
            if (err.code === "P2002") { // Prisma unique constraint
                throw new Error("Email already exists");
            }
            throw new Error("Database error: " + err.message);
        }

        // 2️⃣ Create Stripe customer
        let customer;
        try {
            customer = await stripe.customers.create({
                email: user.email,
                name: companyName,
            });
        } catch (err: any) {
            throw new Error("Stripe error: " + err.message);
        }

        // 3️⃣ Update user with Stripe customer ID
        try {
            await prisma.user.update({
                where: { id: user.id },
                data: { stripeCustomerId: customer.id },
            });
        } catch (err: any) {
            throw new Error("Failed to update user with Stripe ID: " + err.message);
        }

        // 4️⃣ Send welcome email
        try {
            await sendWelcomeEmail(user.email, companyName);
        } catch (err: any) {
            console.error("Email sending failed:", err);
        }

        return { user, customer };
    } catch (err: any) {
        console.error("REGISTER ERROR:", err);
        throw err; // Controller will handle this
    }
};