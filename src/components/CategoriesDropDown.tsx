// components/CategoriesDropdown.tsx
import Link from "next/link";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/wixClientServer";

interface Category {
    name: string;
    href: string;
}

export default async function CategoriesDropdown() {
    // Fetch categories from Wix on the server
    const wixClient = await wixClientServer();

    const categories = await wixClient.collections.queryCollections().find();

    // console.log("RES", result);
    // const categories: Category[] = result.items.map((col: any) => ({
    //     name: col.title,
    //     href: col.url?.relative || `/category/${col.slug}`,
    // }));

    // console.log("Cats ITEM", result.items);
    return (
        <div className="relative inline-block text-left">
            {/* Static label - no state required */}
            <div className="md:px-8 lg:px-16 cursor-pointer">
                Categories
            </div>
            <div className="absolute mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-10 rounded-md">
                {categories.items.map((item) => (
                    <Link key={item._id} href={`/list?cat=${item.slug}`}>
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                            {item.name}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
