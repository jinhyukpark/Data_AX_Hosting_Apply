import { prisma } from "@/lib/db";
import { InviteUserForm } from "./invite-form";
import { Badge } from "@/components/ui/badge";

export default async function SettingsPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50
    });

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-zinc-400">Manage your workspace settings and team members.</p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-1 space-y-6">
                    <h2 className="text-xl font-semibold text-white">Invite Users</h2>
                    <InviteUserForm />
                </div>

                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-semibold text-white">User Management</h2>
                    <div className="bg-zinc-900/30 border border-zinc-800 rounded-lg overflow-hidden">
                        <div className="p-4 bg-zinc-900/50 border-b border-zinc-800">
                            <span className="text-sm text-zinc-400">Showing {users.length} users</span>
                        </div>
                        <ul className="divide-y divide-zinc-800 max-h-[600px] overflow-y-auto">
                            {users.map(user => (
                                <li key={user.id} className="p-4 flex items-center justify-between hover:bg-zinc-900/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400">
                                            {user.name?.[0] || user.email[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-white text-sm">{user.name || "No Name"}</p>
                                            <p className="text-xs text-zinc-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-zinc-600 font-mono hidden sm:inline-block">{user.id.slice(-4)}</span>
                                        <Badge variant="outline" className={user.role === 'ADMIN' ? "bg-purple-500/10 border-purple-500/20 text-purple-400" : "bg-zinc-800/50 border-zinc-700 text-zinc-400"}>
                                            {user.role}
                                        </Badge>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
