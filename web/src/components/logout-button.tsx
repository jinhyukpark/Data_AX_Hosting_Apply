'use client';

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";

export function LogoutButton() {
    const router = useRouter();
    const { t } = useLanguage();

    async function handleLogout() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
        router.refresh();
    }

    return (
        <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors text-sm"
        >
            <LogOut className="w-4 h-4" />
            <span>{t('common.signOut')}</span>
        </button>
    );
}
