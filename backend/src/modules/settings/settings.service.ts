import { prisma } from "../../config/prisma.js";
import { cloudinary } from "../../config/cloudinary.js";
import { stripe } from "../../config/stripe.js";

export const uploadLogo = async (userId: string, file: Express.Multer.File) => {
    const imageUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "contractor-logos", transformation: [{ width: 400, height: 400, crop: "limit" }] },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(file.buffer);
    });

    return await prisma.user.update({
        where: { id: userId },
        data: { logoUrl: imageUrl },
        select: { logoUrl: true },
    });
};

export const fetchSettings = async (userId: string) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: { email: true, companyName: true, logoUrl: true },
    });
};

export const updateSettings = async (userId: string, companyName: string) => {
    return await prisma.user.update({
        where: { id: userId },
        data: { companyName },
        select: { email: true, companyName: true, logoUrl: true },
    });
};

// settings.service.ts
export const deleteAccount = async (userId: string) => {
    // Cascade delete handled by Prisma (photos → projects → customers → user)
    // Also cancel Stripe subscription if active
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (user?.subscriptionId) {
        await stripe.subscriptions.cancel(user.subscriptionId);
    }

    await prisma.user.delete({ where: { id: userId } });
};