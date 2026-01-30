'use client'

import { useActionState } from "react";
// If React 19 is not fully supported for useActionState yet or types are missing, fall back to simple form submission or useState.
// package.json says "react": "19.2.3", so useActionState (or useFormState) should be available. 
// Note: In Next.js 14/15 it was useFormState. React 19 might use useActionState. 
// Let's use `useFormState` from react-dom if available, or try standard form handling to be safe against breaking changes.
// Actually, let's stick to simple onSubmit to avoid hook compatibility guessing games in this environment unless we are sure.
// Wait, "react-dom": "19.2.3" suggests newer React features. Let's try standard client component Logic.

import { useState } from "react";
import { inviteUser } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Mail, User, Shield } from "lucide-react";

export function InviteUserForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(event.currentTarget);
        const result = await inviteUser(null, formData);

        setMessage({
            text: result.message,
            type: result.success ? 'success' : 'error'
        });
        setIsLoading(false);

        if (result.success) {
            (event.target as HTMLFormElement).reset();
        }
    }

    return (
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-500" />
                    Invite User
                </CardTitle>
                <CardDescription>
                    Send an invitation to a new team member or client. They will be assigned a default password: <code>password123!</code>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <div className="relative">
                                <User className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input id="name" name="name" placeholder="John Doe" className="pl-9 bg-zinc-950 border-zinc-800" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                                <Input id="email" name="email" type="email" placeholder="john@example.com" required className="pl-9 bg-zinc-950 border-zinc-800" />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <div className="relative">
                            <Shield className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 z-10" />
                            <Select name="role" defaultValue="CLIENT">
                                <SelectTrigger className="pl-9 bg-zinc-950 border-zinc-800 w-full">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                    <SelectItem value="CLIENT">Client (Standard User)</SelectItem>
                                    <SelectItem value="ADMIN">Administrator</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {message && (
                        <div className={`p-3 rounded-md text-sm ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {message.text}
                        </div>
                    )}

                    <Button type="submit" disabled={isLoading} className="w-full bg-white text-black hover:bg-zinc-200">
                        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : "Send Invitation"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
