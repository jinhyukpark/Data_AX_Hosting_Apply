import { prisma } from "@/lib/db";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowRight } from "lucide-react";

export default async function AllTicketsPage() {
    const tickets = await prisma.ticket.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            user: true,
            _count: {
                select: { messages: true }
            }
        }
    });

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">전체 티켓</h1>
                    <p className="text-zinc-400">사용자 요청을 관리하고 응답하세요.</p>
                </div>
                {/* Search & Filter - Visual Only for now */}
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            placeholder="Search tickets..."
                            className="pl-9 bg-zinc-900 border-zinc-800 text-white w-[200px] focus:ring-blue-500"
                        />
                    </div>
                    <Button variant="outline" className="border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                        <Filter className="w-4 h-4 mr-2" /> Filter
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-zinc-900 text-zinc-400 font-medium border-b border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">상태</th>
                                <th className="px-6 py-4">제목</th>
                                <th className="px-6 py-4">사용자</th>
                                <th className="px-6 py-4">유형</th>
                                <th className="px-6 py-4">날짜</th>
                                <th className="px-6 py-4">작업</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {tickets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-zinc-500">
                                        요청 내역이 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                tickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-zinc-900/80 transition-colors group">
                                        <td className="px-6 py-4">
                                            <StatusBadge status={ticket.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white line-clamp-1">{ticket.title}</span>
                                                <span className="text-zinc-500 text-xs line-clamp-1">{ticket.description}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold">
                                                    {ticket.user?.name?.[0] || 'U'}
                                                </div>
                                                <span className="text-zinc-300">{ticket.user?.name || ticket.user?.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 hover:bg-zinc-700">
                                                {ticket.type}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-zinc-500">
                                            {new Date(ticket.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/all-tickets/${ticket.id}`}>
                                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                                                    상세보기 <ArrowRight className="w-4 h-4 ml-1" />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        DONE: "bg-green-500/10 text-green-500 border-green-500/20",
        REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return (
        <Badge variant="outline" className={`${styles[status] || "bg-zinc-800 text-zinc-400"} border whitespace-nowrap`}>
            {status}
        </Badge>
    );
}
