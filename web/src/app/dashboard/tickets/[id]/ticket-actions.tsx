'use client';

import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function TicketActions({ ticketId, currentStatus }: { ticketId: string, currentStatus: string }) {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function updateStatus(newStatus: string) {
        if (newStatus === currentStatus) return;
        setLoading(true);
        setStatus(newStatus);

        try {
            await fetch(`/api/tickets/${ticketId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: newStatus })
            });
            router.refresh();
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center gap-2">
            <Select value={status} onValueChange={updateStatus} disabled={loading}>
                <SelectTrigger className="w-[140px] bg-zinc-800 border-zinc-700 h-8 text-xs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="DONE">Done</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
            </Select>
            {loading && <Loader2 className="w-3 h-3 animate-spin text-zinc-500" />}
        </div>
    );
}
