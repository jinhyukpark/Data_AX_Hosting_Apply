import { prisma } from "@/lib/db";
import { TemplateList } from "./template-list";

export default async function ApplyFormPage() {
    // Fetch Templates
    const templates = await prisma.ticket.findMany({
        where: { isTemplate: true },
        orderBy: { updatedAt: 'desc' },
        select: {
            id: true,
            templateName: true,
            title: true,
            description: true,
            type: true,
            updatedAt: true,
            createdAt: true,
            _count: {
                select: { derivedTickets: true }
            }
        }
    });

    // Fetch Users for assignment
    const users = await prisma.user.findMany({
        where: { role: 'CLIENT' },
        select: { id: true, name: true, email: true },
        orderBy: { email: 'asc' }
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">신청 폼 템플릿</h1>
                <p className="text-zinc-400">폼 템플릿을 관리하고 고객에게 할당하세요.</p>
            </div>

            <TemplateList templates={templates} users={users} />
        </div>
    );
}
