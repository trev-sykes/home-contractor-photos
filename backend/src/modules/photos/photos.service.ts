import { prisma } from "../../config/prisma.js";
import { cloudinary } from "../../config/cloudinary.js";
import "multer";

const ownedProject = async (userId: string, customerId: string, projectId: string) => {
    const customer = await prisma.customer.findFirst({ where: { id: customerId, userId } });
    if (!customer) return false;
    const project = await prisma.project.findFirst({ where: { id: projectId, customerId } });
    return !!project;
};

export const uploadPhoto = async (
    userId: string,
    customerId: string,
    projectId: string,
    file: Express.Multer.File,
    type: string
) => {
    if (!await ownedProject(userId, customerId, projectId)) return null;

    // Upload buffer to Cloudinary
    const imageUrl = await new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: `contractor-photos/${projectId}` },
            (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(file.buffer);
    });

    return await prisma.photo.create({
        data: { imageUrl, type, projectId },
    });
};

export const deletePhoto = async (userId: string, customerId: string, photoId: string) => {
    const photo = await prisma.photo.findFirst({
        where: {
            id: photoId,
            project: { customerId, customer: { userId } },
        },
    });
    if (!photo?.imageUrl) return null;

    const parts = photo.imageUrl.split("/upload/");
    if (!parts[1]) return null;

    const publicId = parts[1].replace(/\.[^/.]+$/, "");
    await cloudinary.uploader.destroy(publicId);

    return await prisma.photo.delete({ where: { id: photoId } });
};