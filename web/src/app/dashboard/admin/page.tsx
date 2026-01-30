import { prisma } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, FileText, CheckCircle, Clock } from "lucide-react";

async function getStats() {
    const total = await prisma.ticket.count();
    const pending = await prisma.ticket.count({ where: { status: "PENDING" } });
    const active = await prisma.ticket.count({ where: { status: "IN_PROGRESS" } });
    const done = await prisma.ticket.count({ where: { status: "DONE" } });

    return { total, pending, active, done };
}

async function getRecentTickets() {
    return await prisma.ticket.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });
}

// Helper type for the Prisma return value
type TicketWithUser = {
    id: string;
    title: string;
    status: string;
    type: string;
    description: string | null;
    createdAt: Date;
    user: {
        name: string | null;
    };
};

export default async function AdminDashboard() {
    const stats = await getStats();
    const recentTickets = await getRecentTickets();

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard Overview</h2>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Requests" value={stats.total} icon={FileText} color="text-blue-500" />
                <StatCard title="Pending Review" value={stats.pending} icon={Clock} color="text-yellow-500" />
                <StatCard title="In Progress" value={stats.active} icon={Users} color="text-purple-500" />
                <StatCard title="Completed" value={stats.done} icon={CheckCircle} color="text-green-500" />
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                <Card className="col-span-7 bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentTickets.length === 0 ? (
                                <p className="text-zinc-500 text-sm">No requests found.</p>
                            ) : (
                                recentTickets.map((ticket: any) => ( // Using any for simplicity in rapid dev, or use TicketWithUser if strict
                                    <div key={ticket.id} className="flex items-center justify-between p-4 bg-zinc-950/50 rounded-lg border border-zinc-800 hover:border-zinc-700 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{ticket.title}</p>
                                                <p className="text-xs text-zinc-500">{ticket.user.name} • {ticket.type}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <StatusBadge status={ticket.status} />
                                            <Link href={`/dashboard/tickets/${ticket.id}`} className="text-sm text-blue-400 hover:text-blue-300">
                                                View Details
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

function StatCard({ title, value, icon: Icon, color }: { title: string, value: number, icon: any, color: string }) {
    return (
        <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-400">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${color}`} />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
            </CardContent>
        </Card>
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
        <Badge variant="outline" className={`${styles[status] || "bg-zinc-800 text-zinc-400"}`}>
            {status}
        </Badge>
    );
}
