import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();

        // In real world, validate data with Zod here too

        const ticket = await prisma.ticket.create({
            data: {
                title: data.serviceName,
                description: data.shortDescription,
                type: data.requestType?.[0] || "General", // Primary type
                status: "PENDING",
                formData: JSON.stringify(data),
                userId: session.user.id,
            },
        });

        return NextResponse.json({ success: true, ticket });
    } catch (error) {
        console.error("Failed to create ticket:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
