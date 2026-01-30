import { prisma } from "@/lib/db";
import { DashboardContent } from "@/components/admin/dashboard-content";

async function getStats() {
    const total = await prisma.ticket.count();
    const pending = await prisma.ticket.count({ where: { status: "PENDING" } });
    const active = await prisma.ticket.count({ where: { status: "IN_PROGRESS" } });
    const done = await prisma.ticket.count({ where: { status: "DONE" } });

    return { total, pending, active, done };
}

async function getRecentTickets() {
    return await prisma.ticket.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { user: true }
    });
}

export default async function AdminDashboard() {
    const stats = await getStats();
    const recentTickets = await getRecentTickets();

    return <DashboardContent stats={stats} recentTickets={recentTickets} />;
}
