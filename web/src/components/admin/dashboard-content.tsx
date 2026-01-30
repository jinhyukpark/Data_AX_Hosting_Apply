'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, CheckCircle, Clock, LucideIcon } from "lucide-react";
import { useLanguage } from "@/components/language-provider";

interface Ticket {
    id: string;
    title: string;
    status: string;
    type: string;
    user: {
        name: string | null;
    } | null;
}

interface DashboardContentProps {
    stats: {
        total: number;
        pending: number;
        active: number;
        done: number;
    };
    recentTickets: Ticket[];
}

export function DashboardContent({ stats, recentTickets }: DashboardContentProps) {
    const { t } = useLanguage();

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">{t('dashboard.title')}</h2>
                    <p className="text-zinc-400 mt-2">{t('dashboard.subtitle')}</p>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title={t('dashboard.totalRequests')} value={stats.total} icon={FileText} color="text-blue-500 bg-blue-500/10" />
                <StatCard title={t('dashboard.pending')} value={stats.pending} icon={Clock} color="text-yellow-500 bg-yellow-500/10" />
                <StatCard title={t('dashboard.active')} value={stats.active} icon={Users} color="text-purple-500 bg-purple-500/10" />
                <StatCard title={t('dashboard.completed')} value={stats.done} icon={CheckCircle} color="text-green-500 bg-green-500/10" />
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                <Card className="col-span-7 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                    <CardHeader className="border-b border-zinc-800/60 pb-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-white text-lg">{t('dashboard.recentRequests')}</CardTitle>
                            <Link href="/admin/all-tickets" className="text-sm text-blue-400 hover:text-blue-300">
                                {t('dashboard.viewAll')}
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            {recentTickets.length === 0 ? (
                                <div className="text-center py-10">
                                    <p className="text-zinc-500">{t('dashboard.noRequests')}</p>
                                </div>
                            ) : (
                                recentTickets.map((ticket) => (
                                    <div key={ticket.id} className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-zinc-900/40 rounded-lg border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 transition-all">
                                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                                <FileText className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors">{ticket.title}</p>
                                                <p className="text-xs text-zinc-500">{ticket.user?.name || t('dashboard.unknownUser')} • {ticket.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
                                            <StatusBadge status={ticket.status} />
                                            <Link href={`/admin/all-tickets?id=${ticket.id}`} className="text-sm px-3 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors">
                                                {t('dashboard.view')}
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: { title: string, value: number, icon: LucideIcon, color: string }) {
    return (
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm hover:bg-zinc-900/80 transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
                <div className={`p-2 rounded-md ${color}`}>
                    <Icon className="h-4 w-4" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
            </CardContent>
        </Card>
    );
}

function StatusBadge({ status }: { status: string }) {
    const { t } = useLanguage();
    const styles: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        DONE: "bg-green-500/10 text-green-500 border-green-500/20",
        REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return (
        <Badge variant="outline" className={`${styles[status] || "bg-zinc-800 text-zinc-400"} border`}>
            {t(`status.${status}`) || status}
        </Badge>
    );
}
