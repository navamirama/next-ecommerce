// lib/newsletter.ts
// @ts-nocheck
"use server";

import { wixContactsAdminClient } from "./wixContactsAdminClient";

export const subscribeToNewsletter = async (email: string) => {
    if (!email || typeof email !== "string" || !email.trim()) {
        throw new Error("subscribeToNewsletter called without a valid email");
    }

    const trimmedEmail = email.trim();

    const payload = {
        name: {
            first: "Newsletter",
        },
        emails: {
            items: [
                {
                    email: trimmedEmail,
                    tag: "MAIN", // ✅ valid enum
                },
            ],
        },
    };

    console.log(
        "Creating contact with email:",
        trimmedEmail,
        "payload:",
        JSON.stringify(payload, null, 2)
    );

    try {
        await (wixContactsAdminClient.contacts as any).createContact(payload);
        // if this works: new contact created
        return { status: "created" };
    } catch (err: any) {
        console.error("Failed to create contact for newsletter:", err);

        const status = err?.status || err?.response?.status;
        const code =
            err?.details?.applicationError?.code ||
            err?.response?.data?.details?.applicationError?.code;

        // 👇 Adjust these checks if you see a different code in logs for duplicates
        if (status === 409 || code === "CONTACT_ALREADY_EXISTS") {
            // treat as success: contact already in CRM
            return { status: "exists" };
        }

        // some other error (auth, validation, etc) -> rethrow
        throw err;
    }
};
