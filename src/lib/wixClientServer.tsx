// import { OAuthStrategy, createClient } from "@wix/sdk";
// import { collections, products } from "@wix/stores";

// import { cookies } from "next/headers";

// export const wixClientServer = async () => {
//   let refreshToken;

//   try {
//     const cookieStore = cookies();
//     refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
//   } catch (e) {}

//   const wixClient = createClient({
//     modules: {
//       products,
//       collections,
//     },
//     auth: OAuthStrategy({
//       clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
//       tokens: {
//         refreshToken,
//         accessToken: { value: "", expiresAt: 0 },
//       },
//     }),
//   });

//   return wixClient;
// };

import { OAuthStrategy, createClient } from "@wix/sdk";
import { collections, products } from "@wix/stores";
import { orders } from "@wix/ecom";
import { cookies } from "next/headers";
import { members } from "@wix/members";
import { contacts } from "@wix/crm";
import { ApiKeyStrategy } from "@wix/sdk";

export const wixClientServer = async () => {
  let refreshToken;

  try {
    const cookieStore = cookies();
    refreshToken = JSON.parse(cookieStore.get("refreshToken")?.value || "{}");
  } catch (e) { }

  const wixClient = createClient({
    modules: {
      products,
      collections,
      orders,
      members,
      contacts
    },
    auth: OAuthStrategy({
      clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID!,
      tokens: {
        refreshToken,
        accessToken: { value: "", expiresAt: 0 },
      },
    }),
  });


  return wixClient;
};

export const wixAdminClientServer = () => {
  const wixClient = createClient({
    modules: {
      contacts,
    },
    auth: ApiKeyStrategy({
      apiKey: process.env.WIX_API_KEY!,
      accountId: process.env.WIX_ACCOUNT_ID!, // required
      siteId: process.env.WIX_SITE_ID!,       // recommended for site APIs
    }),
  });

  return wixClient;
};