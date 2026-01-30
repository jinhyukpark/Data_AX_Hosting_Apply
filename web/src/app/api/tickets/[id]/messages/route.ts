import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await getSession();

    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { content } = await request.json();

    const message = await prisma.message.create({
        data: {
            content,
            ticketId: id,
            senderId: session.user.id
        },
        include: {
            sender: true
        }
    });

    return NextResponse.json({ success: true, message });
}
