import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChatInterface } from "./chat-interface"; // Client component for chat
import { TicketActions } from "./ticket-actions"; // Client component for admin actions
import { notFound } from "next/navigation";

async function getTicket(id: string) {
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
    return ticket;
}

export default async function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const ticket = await getTicket(id);
    const session = await getSession();

    if (!ticket) notFound();

    // Basic security check: only admin or the ticket owner can view
    if (session.user.role !== 'ADMIN' && ticket.userId !== session.user.id) {
        return <div className="text-red-500">Access Denied</div>;
    }

    const formData = JSON.parse(ticket.formData || "{}");

    const statusColors: Record<string, string> = {
        PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        IN_PROGRESS: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        DONE: "bg-green-500/10 text-green-500 border-green-500/20",
        REJECTED: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
            {/* Left: Ticket Data (Scrollable) */}
            <div className="flex-1 overflow-hidden flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-2xl font-bold text-white">{ticket.title}</h1>
                            <Badge variant="outline" className={statusColors[ticket.status] || "bg-zinc-800"}>
                                {ticket.status}
                            </Badge>
                        </div>
                        <p className="text-zinc-400 text-sm">Requested by {ticket.user.name} ({ticket.user.company})</p>
                    </div>
                    {session.user.role === 'ADMIN' && <TicketActions ticketId={ticket.id} currentStatus={ticket.status} />}
                </div>

                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-6">
                        <SectionPreview title="Basic Info" data={formData} fields={['serviceName', 'shortDescription', 'requestType', 'contactCompany', 'contactName', 'contactEmail']} />
                        <SectionPreview title="Provision & Purpose" data={formData} fields={['purpose', 'finalForm', 'scenario']} />
                        <SectionPreview title="Data Spec" data={formData} fields={['dataFormat', 'totalVolume', 'updateFrequency']} />
                        <SectionPreview title="Infra & Security" data={formData} fields={['hostingType', 'cloudProvider', 'securityLevel', 'region']} />
                        <SectionPreview title="Other Details" data={formData} fields={['billingModel', 'agreeToTerms', 'attachments']} />

                        <Card className="bg-zinc-900 border-zinc-800">
                            <CardHeader><CardTitle className="text-sm">Full Raw Data</CardTitle></CardHeader>
                            <CardContent>
                                <pre className="text-xs text-zinc-500 overflow-auto max-h-40 bg-black p-4 rounded">
                                    {JSON.stringify(formData, null, 2)}
                                </pre>
                            </CardContent>
                        </Card>
                    </div>
                </ScrollArea>
            </div>

            {/* Right: Chat Interface (Fixed width) */}
            <div className="w-full lg:w-[400px] flex flex-col bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900">
                    <h3 className="font-semibold text-white flex items-center gap-2">
                        Discussion
                        <Badge variant="secondary" className="text-xs">{ticket.messages.length}</Badge>
                    </h3>
                </div>
                <ChatInterface
                    ticketId={ticket.id}
                    initialMessages={ticket.messages}
                    currentUserId={session.user.id}
                />
            </div>
        </div>
    );
}

function SectionPreview({ title, data, fields }: { title: string, data: any, fields: string[] }) {
    return (
        <Card className="bg-zinc-950/50 border-zinc-800">
            <CardHeader className="pb-2">
                <CardTitle className="text-base text-zinc-300">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 text-sm">
                    {fields.map((key: string) => (
                        <div key={key}>
                            <dt className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{key}</dt>
                            <dd className="text-white font-medium break-words">
                                {Array.isArray(data[key]) ? data[key].join(", ") : String(data[key] || "-")}
                            </dd>
                        </div>
                    ))}
                </dl>
            </CardContent>
        </Card>
    );
}
