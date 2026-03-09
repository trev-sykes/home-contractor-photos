import { prisma } from "../../config/prisma.js";

// Guard: ensure the customer belongs to this user
const ownedCustomer = (userId: string, customerId: string) =>
    prisma.customer.findFirst({ where: { id: customerId, userId } });

export const fetchAllProjects = async (userId: string) => {
    return await prisma.project.findMany({
        where: { customer: { userId } },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            customer: {
                select: { id: true, name: true },
            },
            _count: { select: { photos: true } },
        },
    });
};


export const fetchProjects = async (userId: string, customerId: string) => {
    if (!await ownedCustomer(userId, customerId)) return null;
    return await prisma.project.findMany({
        where: { customerId },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            address: true,
            createdAt: true,
            _count: { select: { photos: true } },
        },
    });
};

export const fetchProject = async (userId: string, customerId: string, projectId: string) => {
    if (!await ownedCustomer(userId, customerId)) return null;
    return await prisma.project.findFirst({
        where: { id: projectId, customerId },
        include: {
            photos: { orderBy: { createdAt: "desc" } },
        },
    });
};

export const addProject = async (
    userId: string,
    customerId: string,
    data: { name: string; address?: string }
) => {
    if (!await ownedCustomer(userId, customerId)) return null;
    return await prisma.project.create({
        data: { ...data, customerId },
    });
};

export const updateProject = async (
    userId: string,
    customerId: string,
    projectId: string,
    data: { name: string; address?: string }
) => {
    if (!await ownedCustomer(userId, customerId)) return null;
    return await prisma.project.updateMany({
        where: { id: projectId, customerId },
        data,
    });
};

export const deleteProject = async (userId: string, customerId: string, projectId: string) => {
    if (!await ownedCustomer(userId, customerId)) return null;
    return await prisma.project.deleteMany({
        where: { id: projectId, customerId },
    });
};

export const getShareToken = async (userId: string, customerId: string, projectId: string) => {
    if (!await ownedCustomer(userId, customerId)) return null;
    const project = await prisma.project.findFirst({
        where: { id: projectId, customerId },
        select: { shareToken: true },
    });
    if (!project) return null;
    // Generate one if missing
    if (!project.shareToken) {
        const updated = await prisma.project.update({
            where: { id: projectId },
            data: { shareToken: crypto.randomUUID() },
            select: { shareToken: true },
        });
        return updated.shareToken;
    }
    return project.shareToken;
};