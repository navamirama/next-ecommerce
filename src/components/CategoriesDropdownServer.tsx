// components/CategoriesDropdownServer.tsx
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";

import CategoriesDropdownClient from "./CategoriesDropdownClient";

export default async function CategoriesDropdownServer() {

    const wixClient = await wixClientServer();
    const result = await wixClient.collections.queryCollections().find();
    const categories = result.items.map((col: any) => ({
        name: col.name,
        href: col.url?.relative || `/list?cat=${col.slug}`,
    }));

    return <CategoriesDropdownClient category={categories} />;
}
