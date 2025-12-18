// // app/api/newsletter/route.ts
// import { NextResponse } from "next/server";
// import { subscribeToNewsletter } from "@/lib/newsletter";

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         console.log("Newsletter API body:", body);

//         const email = body.email as string;

//         if (!email || !email.trim()) {
//             return NextResponse.json(
//                 { error: "Email is required" },
//                 { status: 400 }
//             );
//         }

//         await subscribeToNewsletter(email.trim());

//         return NextResponse.json({ ok: true });
//     } catch (err) {
//         console.error("Newsletter API error:", err);
//         return NextResponse.json(
//             { error: "Failed to save email" },
//             { status: 500 }
//         );
//     }
// }

// app/api/newsletter/route.ts
import { NextResponse } from "next/server";
import { subscribeToNewsletter } from "@/lib/newsletter";

export async function POST(request: Request) {
    try {
        const body = await request.json().catch(() => ({}));
        console.log("Newsletter API body:", body);

        const email = String(body?.email ?? "").trim();

        if (!email) {
            return NextResponse.json({ ok: false, error: "Email is required" }, { status: 400 });
        }

        const result = await subscribeToNewsletter(email);

        // ✅ Success cases
        if (result.status === "created") {
            return NextResponse.json({ ok: true, status: "created" }, { status: 200 });
        }

        if (result.status === "exists") {
            // Frontend can show "already subscribed" nicely
            return NextResponse.json(
                { ok: true, status: "exists", code: "ALREADY_SUBSCRIBED" },
                { status: 200 }
            );
        }

        // ❌ Error case from Wix (403, etc.) but returned as structured result
        return NextResponse.json(
            {
                ok: false,
                error: result.message || "Failed to save email",
                code: result.code,
                requestId: result.requestId,
            },
            { status: 502 } // upstream/service error
        );
    } catch (err: any) {
        // Unexpected crash
        console.error("Newsletter API error:", err);

        const status = err?.status || err?.response?.status;
        const requestId =
            err?.requestId || err?.details?.requestId || err?.response?.data?.details?.requestId;

        return NextResponse.json(
            {
                ok: false,
                error: "Failed to save email",
                status,
                requestId,
            },
            { status: 500 }
        );
    }
}
