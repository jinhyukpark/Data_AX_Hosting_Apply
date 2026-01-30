import { LogoutButton } from "@/components/logout-button";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, FileText, Settings, User } from "lucide-react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();
    const role = session?.user?.role || "CLIENT";

    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col">
                <div className="mb-10">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Data-AX
                    </h1>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider">{role} Workspace</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <Link href={role === 'ADMIN' ? "/dashboard/admin" : "/dashboard/client"}
                        className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/dashboard/tickets"
                        className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                        <FileText className="w-5 h-5" />
                        <span>All Tickets</span>
                    </Link>
                    <Link href="/dashboard/settings"
                        className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors">
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="pt-6 border-t border-zinc-800">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                            <User className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{session?.user?.name}</p>
                            <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-zinc-950/50">
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
