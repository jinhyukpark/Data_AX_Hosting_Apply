import { login } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.json();
    const form = new FormData();
    for (const key in formData) {
        form.append(key, formData[key]);
    }

    const result = await login(form);
    return NextResponse.json(result);
}
