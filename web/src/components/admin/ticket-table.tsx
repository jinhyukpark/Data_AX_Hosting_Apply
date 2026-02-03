'use client';

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface User {
    id: string;
    name: string | null;
    email: string;
}

interface Ticket {
    id: string;
    title: string;
    description: string | null;
    status: string;
    type: string;
    formData: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    user: User | null;
    _count?: {
        messages: number;
    };
}

interface TicketTableProps {
    tickets: Ticket[];
}

export function TicketTable({ tickets }: TicketTableProps) {
    const { t } = useLanguage();

    const calculateProgress = (formData: string) => {
        try {
            const data = JSON.parse(formData);
            if (!data || typeof data !== 'object') return 0;

            // Count total expected fields (this is an estimate based on standard forms)
            // Ideally we'd compare against the template's structure
            const filledFields = Object.values(data).filter(val => val !== "" && val !== null && val !== undefined).length;

            // Heuristic: If it's a large form, let's say 20 fields is 100%
            // Or better, let's just use a percentage based on known important fields
            const totalEstimatedFields = 25;
            return Math.min(Math.round((filledFields / totalEstimatedFields) * 100), 100);
        } catch (e) {
            return 0;
        }
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-900/80 text-zinc-400 font-medium border-b border-zinc-800">
                        <tr>
                            <th className="px-6 py-4">배포 상태</th>
                            <th className="px-6 py-4">사용자</th>
                            <th className="px-6 py-4">작성 진행율</th>
                            <th className="px-6 py-4">최근 활동</th>
                            <th className="px-6 py-4">피드백</th>
                            <th className="px-6 py-4">작업</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {tickets.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                    배포된 요청서가 없습니다.
                                </td>
                            </tr>
                        ) : (
                            tickets.map((ticket) => {
                                const progress = calculateProgress(ticket.formData);
                                const isDone = ticket.status === 'DONE' || progress === 100;

                                return (
                                    <tr key={ticket.id} className="hover:bg-zinc-900/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <StatusBadge status={isDone ? 'DONE' : (progress > 0 ? 'IN_PROGRESS' : 'PENDING')} />
                                                <span className="text-[10px] text-zinc-500 uppercase tracking-wider ml-1">
                                                    {ticket.type}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 flex items-center justify-center text-sm font-bold border border-blue-500/20 shadow-inner">
                                                    {ticket.user?.name?.[0] || ticket.user?.email?.[0] || 'U'}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-zinc-200 font-semibold">{ticket.user?.name || 'User'}</span>
                                                    <span className="text-xs text-zinc-500">{ticket.user?.email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-full max-w-[120px] space-y-2">
                                                <div className="flex justify-between text-[11px]">
                                                    <span className={progress > 0 ? "text-blue-400" : "text-zinc-500"}>
                                                        {progress}% {progress === 100 ? '완료' : '진행 중'}
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all duration-1000 ${isDone ? 'bg-green-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-zinc-300 font-medium">
                                                    {new Date(ticket.updatedAt).toLocaleDateString()}
                                                </span>
                                                <span className="text-[10px] text-zinc-500">
                                                    최종 수정일
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/all-tickets/${ticket.id}`} className="inline-flex items-center gap-2 group/msg">
                                                <div className={`p-2 rounded-lg border transition-colors ${ticket._count?.messages ? 'bg-blue-500/5 border-blue-500/20 text-blue-400' : 'bg-zinc-800/50 border-zinc-700 text-zinc-500 group-hover/msg:border-zinc-600'}`}>
                                                    <MessageSquare className="w-4 h-4" />
                                                </div>
                                                {ticket._count?.messages ? (
                                                    <span className="text-xs font-bold text-blue-400">{ticket._count.messages}개의 피드백</span>
                                                ) : (
                                                    <span className="text-xs text-zinc-600">피드백 없음</span>
                                                )}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/all-tickets/${ticket.id}`}>
                                                <Button size="sm" variant="ghost" className="text-zinc-400 hover:text-white hover:bg-zinc-800">
                                                    관리 <ArrowRight className="w-4 h-4 ml-2" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const { t } = useLanguage();
    const styles: Record<string, string> = {
        PENDING: "bg-zinc-800 text-zinc-400 border-zinc-700",
        IN_PROGRESS: "bg-blue-500/10 text-blue-400 border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]",
        DONE: "bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]",
        REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const label: Record<string, string> = {
        PENDING: "수신 전",
        IN_PROGRESS: "작성 중",
        DONE: "작성 완료",
        REJECTED: "반려됨"
    }

    return (
        <Badge variant="outline" className={`${styles[status] || "bg-zinc-800 text-zinc-400"} border px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-tight`}>
            {label[status] || status}
        </Badge>
    );
}
