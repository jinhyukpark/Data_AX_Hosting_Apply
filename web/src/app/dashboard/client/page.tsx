import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Plus, Layout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getMyTickets(userId: string) {
    return await prisma.ticket.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    });
}

export default async function ClientDashboard() {
    const session = await getSession();
    const tickets = await getMyTickets(session.user.id);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">My Requests</h2>
                    <p className="text-zinc-400 mt-2">Manage and track your service hosting requests</p>
                </div>
                <Link href="/dashboard/tickets/new">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0">
                        <Plus className="w-4 h-4 mr-2" /> New Request
                    </Button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Create New Card (Empty State or Action) */}
                <Link href="/dashboard/tickets/new" className="group">
                    <Card className="h-full bg-zinc-900/50 border-zinc-800 border-dashed hover:border-blue-500/50 hover:bg-zinc-900 transition-all cursor-pointer flex flex-col items-center justify-center p-6 text-center space-y-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-800 group-hover:bg-blue-500/20 flex items-center justify-center transition-colors">
                            <Plus className="w-8 h-8 text-zinc-400 group-hover:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-white group-hover:text-blue-400">New Service Request</h3>
                            <p className="text-sm text-zinc-500 mt-1">Start a new hosting request for Dataset, API, MCP or Agent</p>
                        </div>
                    </Card>
                </Link>

                {/* Ticket List */}
                {tickets.map((ticket: any) => (
                    <Card key={ticket.id} className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-colors group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <Badge variant="outline" className="bg-zinc-800 text-zinc-300 border-zinc-700">{ticket.type}</Badge>
                            <StatusBadge status={ticket.status} />
                        </CardHeader>
                        <CardContent>
                            <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{ticket.title}</h3>
                            <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
                                {ticket.description || "No description provided."}
                            </p>
                            <div className="flex items-center justify-between mt-4 text-xs text-zinc-500">
                                <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                                <Link href={`/dashboard/tickets/${ticket.id}`} className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors">
                                    View <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
        PENDING: "text-yellow-500 border-yellow-500/20",
        IN_PROGRESS: "text-blue-500 border-blue-500/20",
        DONE: "text-green-500 border-green-500/20",
        REJECTED: "text-red-500 border-red-500/20",
    };
    return (
        <span className={`text-xs px-2 py-1 rounded-full border ${styles[status] || "text-zinc-400 border-zinc-700"}`}>
            {status}
        </span>
    );
}
