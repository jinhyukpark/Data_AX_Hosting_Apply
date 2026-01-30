'use client'

import { useState } from "react"; // Removed useOptimistic for simplicity in this turn
import { updateTicketStatus, sendMessage } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Send, User as UserIcon, Bot, Clock } from "lucide-react";

type TicketViewProps = {
    ticket: any; // Type properly in real app
    currentUser: any;
};

export function TicketView({ ticket, currentUser }: TicketViewProps) {
    const [isSending, setIsSending] = useState(false);

    async function handleStatusChange(value: string) {
        await updateTicketStatus(ticket.id, value);
    }

    async function handleSendMessage(formData: FormData) {
        setIsSending(true);
        await sendMessage(null, formData);
        setIsSending(false);
        // Reset form manually since we are not using useFormState for reset logic here
        const form = document.getElementById("message-form") as HTMLFormElement;
        form?.reset();
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-12rem)]">
            {/* Left Column: Ticket Info & Form Data */}
            <div className="lg:col-span-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                <Card className="bg-zinc-900/50 border-zinc-800">
                    <CardContent className="p-6 space-y-4">
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Status</h3>
                            <Select defaultValue={ticket.status} onValueChange={handleStatusChange}>
                                <SelectTrigger className="w-full bg-zinc-950 border-zinc-800">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectItem value="PENDING">PENDING</SelectItem>
                                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                    <SelectItem value="DONE">DONE</SelectItem>
                                    <SelectItem value="REJECTED">REJECTED</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Request Type</h3>
                            <Badge variant="outline" className="border-zinc-700 text-zinc-300">{ticket.type}</Badge>
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Description</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">{ticket.description || "No description."}</p>
                        </div>

                        <div className="pt-4 border-t border-zinc-800">
                            <h3 className="text-sm font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Form Data</h3>
                            <div className="bg-zinc-950 rounded-lg p-4 font-mono text-xs text-zinc-300 overflow-x-auto border border-zinc-800">
                                <pre>{JSON.stringify(JSON.parse(ticket.formData || '{}'), null, 2)}</pre>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column: Conversation */}
            <div className="lg:col-span-2 flex flex-col bg-zinc-900/30 rounded-xl border border-zinc-800 overflow-hidden">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900/50">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                        Discussion
                        <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 text-xs">{ticket.messages.length} messages</Badge>
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-zinc-950/30">
                    {ticket.messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
                            <Bot className="w-10 h-10 opacity-20" />
                            <p>No messages yet. Start the conversation.</p>
                        </div>
                    ) : (
                        ticket.messages.map((msg: any) => {
                            const isMe = msg.senderId === currentUser.id;
                            const isSystem = msg.senderId === 'system'; // Example
                            return (
                                <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isMe ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                                        {isMe ? <UserIcon className="w-4 h-4 text-white" /> : <UserIcon className="w-4 h-4 text-zinc-300" />}
                                    </div>
                                    <div className={`max-w-[80%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-semibold text-zinc-400">{isMe ? 'You' : msg.sender.name}</span>
                                            <span className="text-[10px] text-zinc-600">{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                        <div className={`p-3 rounded-lg text-sm ${isMe ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-zinc-800 text-zinc-200 rounded-tl-none'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>

                <div className="p-4 bg-zinc-900 border-t border-zinc-800">
                    <form id="message-form" action={handleSendMessage} className="flex gap-2">
                        <input type="hidden" name="ticketId" value={ticket.id} />
                        <Textarea
                            name="content"
                            placeholder="Type your reply..."
                            className="min-h-[50px] max-h-[150px] bg-zinc-950 border-zinc-800 focus:ring-blue-500 resize-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    e.currentTarget.form?.requestSubmit();
                                }
                            }}
                        />
                        <Button type="submit" disabled={isSending} className="h-auto px-4 bg-blue-600 hover:bg-blue-500 text-white">
                            <Send className="w-4 h-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
