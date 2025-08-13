'use client';

import { useState, useRef } from "react";
import Link from "next/link";
import { useClickOutside } from '@custom-react-hooks/use-click-outside';


export default function CategoriesDropdownClient({ category }: { category: { name: string; href: string }[] }) {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));

    return (
        <div ref={ref} className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
            >
                <div className=" text-1xl tracking-wide">
                    Categories
                </div>

                <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l3 3 3-3" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 rounded-md" style={{ backgroundColor: "white", color: "black" }}>
                    {category.map((cat) => (

                        <Link key={cat.name} href={cat.href}>
                            <span onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                {cat.name}
                            </span>
                        </Link>
                        // </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
