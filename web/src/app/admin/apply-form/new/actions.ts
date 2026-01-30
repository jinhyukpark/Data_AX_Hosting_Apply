'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { FormValues } from "@/lib/schema";
import { getSession } from "@/lib/auth";

export async function createTemplate(data: FormValues) {
    const session = await getSession();
    if (!session || session.user.role !== 'ADMIN') {
        return { success: false, message: "권한이 없습니다." };
    }

    // Determine type from requestType array or default
    const type = data.requestType?.[0] || 'MIXED';

    try {
        await prisma.ticket.create({
            data: {
                title: data.serviceName || "제목 없는 템플릿",
                description: data.shortDescription,
                type: type,
                status: 'PENDING',
                userId: session.user.id, // Admin owns the template
                formData: JSON.stringify(data),
                isTemplate: true,
                templateName: data.serviceName // Use service name as template name for now
            }
        });

        revalidatePath('/admin/apply-form');
        return { success: true, message: "템플릿이 성공적으로 생성되었습니다." };
    } catch (e) {
        console.error(e);
        return { success: false, message: "템플릿 생성에 실패했습니다." };
    }
}
