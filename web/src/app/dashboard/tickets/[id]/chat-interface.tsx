'use client';

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";
import { useRouter } from "next/navigation";

export function ChatInterface({ ticketId, initialMessages, currentUserId }: { ticketId: string, initialMessages: any[], currentUserId: string }) {
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        // Scroll to bottom on load
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    async function sendMessage(e: React.FormEvent) {
        e.preventDefault();
        if (!input.trim()) return;

        const optimisticMsg = {
            id: Date.now().toString(),
            content: input,
            senderId: currentUserId,
            createdAt: new Date().toISOString(),
            sender: { id: currentUserId, name: 'You' } // Mock
        };

        setMessages([...messages, optimisticMsg]);
        setInput("");

        try {
            const res = await fetch(`/api/tickets/${ticketId}/messages`, {
                method: 'POST',
                body: JSON.stringify({ content: input })
            });
            if (res.ok) {
                router.refresh();
                // In a real app with Supabase/Socket, we would listen for new messages.
                // Here we just refresh to ensure state consistency or rely on the optimistic update
            }
        } catch (err) {
            console.error("Failed to send", err);
        }
    }

    return (
        <div className="flex flex-col h-full bg-zinc-900/50">
            <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                {messages.length === 0 && (
                    <div className="text-center text-zinc-600 text-sm mt-10">No messages yet. Start the discussion.</div>
                )}
                {messages.map((msg: any) => {
                    const isMe = msg.senderId === currentUserId;
                    return (
                        <div key={msg.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-lg p-3 text-sm ${isMe ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200'}`}>
                                <div className="flex items-center gap-2 mb-1 opacity-70 text-xs">
                                    <span className="font-bold">{isMe ? 'You' : msg.sender?.name || 'User'}</span>
                                    <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <form onSubmit={sendMessage} className="p-3 border-t border-zinc-800 bg-zinc-900 flex gap-2">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                />
                <Button size="icon" type="submit" className="bg-blue-600 hover:bg-blue-500">
                    <Send className="w-4 h-4" />
                </Button>
            </form>
        </div>
    );
}
