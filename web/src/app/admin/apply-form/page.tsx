import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { DistributionDialog } from "@/components/admin/distribution-dialog";
import { TicketTable } from "@/components/admin/ticket-table";

export default async function ApplyFormPage() {
    // Fetch the most recent template to show as "Featured"
    const latestTemplate = await prisma.ticket.findFirst({
        where: { isTemplate: true },
        orderBy: { updatedAt: 'desc' },
    });

    // Fetch all templates for the selection dialog
    const allTemplates = await prisma.ticket.findMany({
        where: { isTemplate: true },
        select: { id: true, templateName: true },
    });

    // Fetch Users for assignment
    const users = await prisma.user.findMany({
        where: { role: 'CLIENT' },
        select: { id: true, name: true, email: true },
        orderBy: { email: 'asc' }
    });

    // Fetch Distributed Tickets (user applications)
    const distributedTickets = await prisma.ticket.findMany({
        where: { isTemplate: false },
        orderBy: { updatedAt: 'desc' },
        include: {
            user: true,
            _count: {
                select: { messages: true }
            }
        }
    });

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Template Section */}
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">신청 폼 관리</h1>
                    <p className="text-zinc-400 mt-2">대표 신청 폼을 관리하고 새로운 템플릿을 구성하세요.</p>
                </div>

                <div className="max-w-2xl">
                    <Link href="/admin/apply-form/new">
                        <Card className="group relative overflow-hidden bg-gradient-to-br from-zinc-900 to-zinc-950 border-zinc-800 hover:border-blue-500/50 transition-all duration-500 cursor-pointer shadow-2xl">
                            {/* Decorative Background */}
                            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />

                            <CardHeader className="relative z-10 p-8 pb-4">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-4 bg-blue-500/10 rounded-2xl group-hover:scale-110 transition-transform duration-500 border border-blue-500/20">
                                        <FileText className="w-10 h-10 text-blue-500" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
                                        기본 템플릿
                                    </div>
                                </div>
                                <CardTitle className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                    {latestTemplate?.templateName || "표준 데이터셋 요청 폼"}
                                </CardTitle>
                                <CardDescription className="text-zinc-500 text-lg leading-relaxed">
                                    {latestTemplate?.description || "금융 및 행정 데이터 세트 요청을 위한 통합 표준 신청 양식입니다. 이곳에서 폼의 세부 항목을 편집하고 관리할 수 있습니다."}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="relative z-10 p-8 pt-4">
                                <div className="flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform">
                                    폼 편집 및 관리하기 <ArrowRight className="ml-2 w-5 h-5" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* Distribution Board Section */}
            <div className="space-y-6 pt-10 border-t border-zinc-800/50">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight">요청서 배포 현황</h2>
                        <p className="text-zinc-500 mt-1">고객들에게 발송된 요청서의 작성 진행율과 상태를 관리합니다.</p>
                    </div>
                    <DistributionDialog users={users} templates={allTemplates} />
                </div>

                <TicketTable tickets={distributedTickets as any} />
            </div>
        </div>
    );
}
