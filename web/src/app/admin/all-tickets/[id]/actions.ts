'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";

export async function updateTicketStatus(ticketId: string, newStatus: string) {
    const session = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
        throw new Error("Unauthorized");
    }

    await prisma.ticket.update({
        where: { id: ticketId },
        data: { status: newStatus }
    });
    revalidatePath(`/admin/all-tickets`);
    revalidatePath(`/admin/all-tickets/${ticketId}`);
}

export async function sendMessage(prevState: any, formData: FormData) {
    const session = await getSession();
    if (!session) return { success: false, message: "Not authenticated" };

    const ticketId = formData.get("ticketId") as string;
    const content = formData.get("content") as string;

    if (!content.trim()) return { success: false, message: "Content cannot be empty" };

    try {
        await prisma.message.create({
            data: {
                content,
                ticketId,
                senderId: session.user.id,
                isInternal: false
            }
        });
        revalidatePath(`/admin/all-tickets/${ticketId}`);
        return { success: true, message: "Sent" };
    } catch (e) {
        return { success: false, message: "Error sending message" };
    }
}
