// // lib/newsletter.ts
// // @ts-nocheck
// "use server";

// import { wixContactsAdminClient } from "./wixContactsAdminClient";

// export const subscribeToNewsletter = async (email: string) => {
//     if (!email || typeof email !== "string" || !email.trim()) {
//         throw new Error("subscribeToNewsletter called without a valid email");
//     }

//     const trimmedEmail = email.trim();

//     const payload = {
//         name: {
//             first: "Newsletter",
//         },
//         emails: {
//             items: [
//                 {
//                     email: trimmedEmail,
//                     tag: "MAIN", // ✅ valid enum
//                 },
//             ],
//         },
//     };

//     console.log(
//         "Creating contact with email:",
//         trimmedEmail,
//         "payload:",
//         JSON.stringify(payload, null, 2)
//     );

//     try {
//         await (wixContactsAdminClient.contacts as any).createContact(payload);
//         // if this works: new contact created
//         return { status: "created" };
//     } catch (err: any) {
//         console.error("Failed to create contact for newsletter:", err);

//         const status = err?.status || err?.response?.status;
//         const code =
//             err?.details?.applicationError?.code ||
//             err?.response?.data?.details?.applicationError?.code;

//         // 👇 Adjust these checks if you see a different code in logs for duplicates
//         if (status === 409 || code === "CONTACT_ALREADY_EXISTS") {
//             // treat as success: contact already in CRM
//             return { status: "exists" };
//         }

//         // some other error (auth, validation, etc) -> rethrow
//         throw err;
//     }
// };

// lib/newsletter.ts
"use server";

import { wixContactsAdminClient } from "./wixContactsAdminClient";

type NewsletterResult =
    | { status: "created" }
    | { status: "exists" }
    | { status: "error"; code?: number | string; requestId?: string; message?: string };

export const subscribeToNewsletter = async (email: string): Promise<NewsletterResult> => {
    if (!email || typeof email !== "string" || !email.trim()) {
        throw new Error("subscribeToNewsletter called without a valid email");
    }

    const trimmedEmail = email.trim().toLowerCase();

    const payload = {
        name: { first: "Newsletter" },
        emails: {
            items: [{ email: trimmedEmail, tag: "MAIN" as const }],
        },
    };

    console.log("Newsletter API body:", { email: trimmedEmail });

    try {
        // ✅ 1) Upsert pattern: query first (prevents 403 on duplicates)
        const existing = await (wixContactsAdminClient.contacts as any)
            .queryContacts()
            .eq("info.emails.email", trimmedEmail)
            .find();

        if (existing?.items?.length) {
            console.log("Newsletter: contact already exists:", trimmedEmail);
            return { status: "exists" };
        }

        // ✅ 2) Create only if not found
        console.log(
            "Creating contact with email:",
            trimmedEmail,
            "payload:",
            JSON.stringify(payload, null, 2)
        );

        await (wixContactsAdminClient.contacts as any).createContact(payload);

        return { status: "created" };
    } catch (err: any) {
        // Helpful debugging details
        const status = err?.status || err?.response?.status;
        const requestId =
            err?.requestId ||
            err?.details?.requestId ||
            err?.response?.data?.details?.requestId;

        const code =
            err?.details?.applicationError?.code ||
            err?.response?.data?.details?.applicationError?.code;

        const message =
            err?.message ||
            err?.response?.data?.message ||
            err?.details?.applicationError?.description ||
            "";

        console.error("Failed to upsert contact for newsletter:", {
            status,
            code,
            requestId,
            message,
            raw: err,
        });

        // If Wix still throws a duplicate-ish error sometimes, treat as success
        if (status === 409 || code === "CONTACT_ALREADY_EXISTS") {
            return { status: "exists" };
        }

        return { status: "error", code, requestId, message };
    }
};
