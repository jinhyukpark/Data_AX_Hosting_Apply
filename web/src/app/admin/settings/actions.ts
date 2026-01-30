'use server'

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
// We assume bcryptjs or similar is available. If not, we store plain text for now (NOT SECURE, but for prototype)
// Checking package.json... "bcryptjs": "^3.0.3" is present.
import { hash } from "bcryptjs";

export async function inviteUser(prevState: any, formData: FormData) {
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const name = formData.get("name") as string;

    if (!email || !role) return { message: "Email and Role are required", success: false };

    try {
        // Create user with a temporary password
        const hashedPassword = await hash("password123!", 10);

        await prisma.user.create({
            data: {
                email,
                name: name || email.split('@')[0],
                role,
                password: hashedPassword,
                company: "TBD"
            }
        });

        revalidatePath("/admin/settings");
        return { message: "User invited successfully", success: true };
    } catch (e: any) {
        console.error(e);
        return { message: "Failed to invite user. Email might already exist.", success: false };
    }
}
