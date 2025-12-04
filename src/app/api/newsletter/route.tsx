// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("Newsletter API body:", body);

        const email = body.email as string;

        if (!email || !email.trim()) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        await subscribeToNewsletter(email.trim());

        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error("Newsletter API error:", err);
        return NextResponse.json(
            { error: "Failed to save email" },
            { status: 500 }
        );
    }
}
