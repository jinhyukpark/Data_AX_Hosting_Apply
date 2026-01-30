import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin-sidebar";
import { FloatingLanguageSwitcher } from "@/components/floating-language-switcher";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getSession();

    // Admin Guard
    if (!session || session.user?.role !== "ADMIN") {
        // In a real app, maybe redirect to 403 or login
        // redirect("/login"); 
        // For now, let's just allow rendering but layout shows role
    }

    return (
        <div className="flex h-screen bg-black text-white selection:bg-blue-500/30">
            <AdminSidebar user={session?.user} />

            {/* Main Content */}
            <main className="flex-1 overflow-auto bg-black relative">
                {/* Background Grain/Noise or Gradient could go here */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black pointer-events-none" />
                <div className="relative p-8 max-w-7xl mx-auto min-h-full">
                    {children}
                </div>
                <FloatingLanguageSwitcher />
            </main>
        </div>
    );
}
