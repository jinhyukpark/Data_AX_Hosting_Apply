'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function assignTemplateToUser(templateId: string, userIdOrEmail: string) {
    const session = await getSession();
    if (!session || session.user.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

    try {
        const template = await prisma.ticket.findUnique({ where: { id: templateId } });
        if (!template) return { success: false, message: "Template not found" };

        let finalUserId = userIdOrEmail;

        // Check if it's an email (heuristic)
        if (userIdOrEmail.includes('@')) {
            let user = await prisma.user.findUnique({ where: { email: userIdOrEmail } });
            if (!user) {
                // Create a temporary user
                user = await prisma.user.create({
                    data: {
                        email: userIdOrEmail,
                        password: 'temp-password', // Should be hashed or handled properly
                        role: 'CLIENT',
                        name: userIdOrEmail.split('@')[0]
                    }
                });
            }
            finalUserId = user.id;
        }

        // Clone the template to a new ticket for the user
        await prisma.ticket.create({
            data: {
                title: template.templateName || template.title,
                description: template.description,
                type: template.type,
                formData: template.formData,
                status: 'PENDING',
                userId: finalUserId,
                isTemplate: false,
                fromTemplateId: template.id
            }
        });

        revalidatePath('/admin/apply-form');
        revalidatePath('/admin/all-tickets');
        return { success: true, message: "Assigned successfully" };
    } catch (e) {
        console.error(e);
        return { success: false, message: "Failed to assign" };
    }
}

export async function deleteTemplate(templateId: string) {
    const session = await getSession();
    if (!session || session.user.role !== 'ADMIN') return { success: false, message: "Unauthorized" };

    try {
        await prisma.ticket.delete({ where: { id: templateId } });
        revalidatePath('/admin/apply-form');
        return { success: true, message: "Deleted successfully" };
    } catch (e) {
        return { success: false, message: "Failed to delete" };
    }
}
