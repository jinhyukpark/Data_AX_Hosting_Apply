'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function submitForm(ticketId: string, formData: FormData) {
    const description = formData.get("description") as string;
    // In a real scenario, we'd parse specific dynamic fields. 
    // Here we assume 'formData' field in DB stores the JSON structure of the user inputs.
    const rawData = formData.get("jsonData") as string;

    await prisma.ticket.update({
        where: { id: ticketId },
        data: {
            description,
            formData: rawData,
            status: "IN_PROGRESS"
        }
    });

    // Also add a system message or notify admin logic could go here

    revalidatePath(`/client`);
    revalidatePath(`/client/${ticketId}`);
}
