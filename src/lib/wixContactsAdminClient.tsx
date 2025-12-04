import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { contacts } from "@wix/crm"; // or @wix/crm if that’s what you're using

export const wixContactsAdminClient = createClient({
    modules: {
        contacts,
    },
    auth: ApiKeyStrategy({
        apiKey: process.env.WIX_API_KEY!,        // make sure these are set in .env.local
        siteId: process.env.WIX_SITE_ID!,
        accountId: process.env.WIX_ACCOUNT_ID!,
    }),
});
