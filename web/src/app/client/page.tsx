import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Plus, ArrowRight, FileSignature } from "lucide-react";

async function getMyTickets(userId: string) {
    return await prisma.ticket.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: {
            // We can include relations if needed
        }
    });
}

export default async function ClientDashboard() {
    const session = await getSession();
    const tickets = await getMyTickets(session.user.id);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">나의 요청 내역</h2>
                    <p className="text-zinc-400 mt-2">할당된 스펙 작성 폼과 상태를 확인하세요.</p>
                </div>
                {/* 
                <Link href="/client/new">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0 shadow-lg shadow-purple-500/20">
                        <Plus className="w-4 h-4 mr-2" /> New Request
                    </Button>
                </Link> 
                */}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* If no tickets, show empty state */}
                {tickets.length === 0 && (
                    <Card className="col-span-full bg-zinc-900/30 border-zinc-800 border-dashed p-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center">
                                <FileSignature className="w-8 h-8 text-zinc-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-white">할당된 폼이 없습니다</h3>
                                <p className="text-zinc-500 mt-1 max-w-sm mx-auto">
                                    아직 할당된 스펙 작성 폼이 없습니다. 관리자가 템플릿을 할당할 때까지 기다려 주세요.
                                </p>
                            </div>
                        </div>
                    </Card>
                )}

                {/* Ticket List */}
                {tickets.map((ticket: any) => (
                    <Card key={ticket.id} className="bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all group backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Badge variant="outline" className="bg-zinc-800/50 text-zinc-300 border-zinc-700">{ticket.type}</Badge>
                            <StatusBadge status={ticket.status} />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors">{ticket.title}</h3>
                            <p className="text-sm text-zinc-500 line-clamp-2 mb-4 h-10">
                                {ticket.description || "설명이 없습니다."}
                            </p>
                            <div className="flex items-center justify-between mt-4 text-xs text-zinc-500 border-t border-zinc-800 pt-4">
                                <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                <Link href={`/client/${ticket.id}`} className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors font-medium">
                                    {ticket.status === 'PENDING' ? '폼 작성하기' : '상세 보기'} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        PENDING: "text-yellow-500 border-yellow-500/20 bg-yellow-500/10",
        IN_PROGRESS: "text-blue-500 border-blue-500/20 bg-blue-500/10",
        DONE: "text-green-500 border-green-500/20 bg-green-500/10",
        REJECTED: "text-red-500 border-red-500/20 bg-red-500/10",
    };
    return (
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${styles[status] || "text-zinc-400 border-zinc-700"}`}>
            {status}
        </span>
    );
}
