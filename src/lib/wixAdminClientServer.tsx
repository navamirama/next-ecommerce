import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { contacts } from "@wix/crm";

export const wixAdminClientServer = async () => {
    return createClient({
        modules: { contacts },
        auth: ApiKeyStrategy({
            apiKey: process.env.WIX_API_KEY!,
            accountId: process.env.WIX_ACCOUNT_ID!, // <-- REQUIRED (matches your TS error)
            siteId: process.env.WIX_SITE_ID!,       // <-- strongly recommended for site APIs like Contacts
        }),
    });
};
