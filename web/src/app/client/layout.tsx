import { LogoutButton } from "@/components/logout-button";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import { LayoutDashboard, FileText, User, Sparkles } from "lucide-react";
import { FloatingLanguageSwitcher } from "@/components/floating-language-switcher";

export default async function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    return (
        <div className="flex h-screen bg-black text-white selection:bg-purple-500/30">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800/60 p-6 flex flex-col bg-zinc-950/30 backdrop-blur-xl">
                <div className="mb-10 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                            Data-AX
                        </h1>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                            Client Workspace
                        </span>
                    </div>
                </div>

                <nav className="flex-1 space-y-1">
                    <NavItem href="/client" icon={LayoutDashboard} label="My Dashboard" />
                    {/* Add more client links here later */}
                </nav>

                <div className="pt-6 border-t border-zinc-800/60">
                    <div className="flex items-center gap-3 mb-4 px-2 p-2 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0">
                            <User className="w-4 h-4 text-zinc-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-zinc-200">{session?.user?.name || "Client"}</p>
                            <p className="text-xs text-zinc-500 truncate">{session?.user?.email}</p>
                        </div>
                    </div>
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black pointer-events-none" />
                <div className="relative p-8 max-w-7xl mx-auto min-h-full">
                    {children}
                </div>
                <FloatingLanguageSwitcher />
            </main>
        </div>
    );
}

function NavItem({ href, icon: Icon, label }: { href: string, icon: any, label: string }) {
    return (
        <Link href={href}
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all group">
            <Icon className="w-5 h-5 group-hover:text-purple-400 transition-colors" />
            <span className="font-medium">{label}</span>
        </Link>
    )
}
