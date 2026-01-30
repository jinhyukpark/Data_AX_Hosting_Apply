import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { TicketView } from "./ticket-view";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getSession();

    if (!session) {
        // Handle auth redirect or error
        return <div>Please log in</div>;
    }

    const ticket = await prisma.ticket.findUnique({
        where: { id },
        include: {
            user: true,
            messages: {
                include: { sender: true },
                orderBy: { createdAt: 'asc' }
            }
        }
    });

    if (!ticket) {
        notFound();
    }

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
            <div className="flex items-center gap-4">
                <Link href="/admin/all-tickets" className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        {ticket.title}
                        <span className="text-sm font-normal text-zinc-500">#{ticket.id.slice(-6)}</span>
                    </h1>
                    <p className="text-zinc-400 text-sm">Requested by <span className="text-white font-medium">{ticket.user?.name}</span> on {new Date(ticket.createdAt).toLocaleDateString()}</p>
                </div>
            </div>

            <TicketView ticket={ticket} currentUser={session.user} />
        </div>
    );
}
