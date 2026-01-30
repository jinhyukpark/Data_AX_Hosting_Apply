'use client';

import Link from "next/link";
import { LayoutDashboard, FileText, Settings, User, Shield, LucideIcon } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { useLanguage } from "@/components/language-provider";
import { LanguageSwitcher } from "@/components/language-switcher";

interface AdminSidebarProps {
    user?: {
        name?: string | null;
        email?: string | null;
    };
}

export function AdminSidebar({ user }: AdminSidebarProps) {
    const { t } = useLanguage();

    return (
        <aside className="w-64 border-r border-zinc-800 p-6 flex flex-col bg-zinc-950">
            <div className="mb-10 flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        Data-AX
                    </h1>
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold flex items-center gap-1">
                        {t('common.adminWorkspace')}
                    </span>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                <NavItem href="/admin" icon={LayoutDashboard} label={t('nav.dashboard')} />
                <NavItem href="/admin/all-tickets" icon={FileText} label={t('nav.allTickets')} />
                <NavItem href="/admin/apply-form" icon={FileText} label={t('nav.formTemplates')} />
                <NavItem href="/admin/settings" icon={Settings} label={t('nav.settings')} />
            </nav>

            <div className="pt-6 border-t border-zinc-800 space-y-4">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50">
                    <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700">
                        <User className="w-4 h-4 text-zinc-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-zinc-200">{user?.name || "Admin"}</p>
                        <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                    </div>
                </div>
                <LogoutButton />
            </div>
        </aside>
    );
}

function NavItem({ href, icon: Icon, label }: { href: string, icon: LucideIcon, label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all group"
        >
            <Icon className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
            <span className="font-medium">{label}</span>
        </Link>
    );
}
