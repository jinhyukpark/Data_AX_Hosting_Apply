import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { SubmitForm } from "./form-view";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ClientTicketPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getSession();
    if (!session) redirect("/login");

    const ticket = await prisma.ticket.findUnique({
        where: { id },
    });

    if (!ticket || ticket.userId !== session.user.id) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/client" className="p-2 -ml-2 rounded-full hover:bg-zinc-800 text-zinc-400 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Fill Specification</h1>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <span className="text-sm font-medium text-purple-400">{ticket.type}</span>
                        <span>•</span>
                        <span className="text-sm">{ticket.title}</span>
                    </div>
                </div>
            </div>

            <SubmitForm ticket={ticket} />
        </div>
    );
}
