// 'use client';

// import { useState, useRef } from "react";
// import Link from "next/link";
// import { useClickOutside } from '@custom-react-hooks/use-click-outside';


// export default function CategoriesDropdownClient({ category }: { category: { name: string; href: string }[] }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const ref = useRef<HTMLDivElement>(null);
//     useClickOutside(ref, () => setIsOpen(false));

//     return (
//         <div ref={ref} className="relative inline-block text-left">
//             <button
//                 onClick={() => setIsOpen((prev) => !prev)}
//                 className="inline-flex items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//                 <div className="inline-flex items-center text-base font-medium text-gray-700 hover:text-gray-900">
//                     Categories
//                 </div>

//                 <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7l3 3 3-3" />
//                 </svg>
//             </button>

//             {isOpen && (
//                 <div className="absolute mt-2 w-48 bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50 rounded-md" style={{ backgroundColor: "white", color: "black" }}>
//                     {category.map((cat) => (

//                         <Link key={cat.name} href={cat.href}>
//                             <span onClick={() => setIsOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                 {cat.name}
//                             </span>
//                         </Link>
//                         // </Link>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useClickOutside } from '@custom-react-hooks/use-click-outside';

interface Props {
    categories: { name: string; href: string }[];
    onClick?: () => void;
}

const CategoriesDropdown: React.FC<Props> = ({ categories, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setIsOpen(false));
    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md flex items-center gap-2"
            >
                Categories
                <span className="text-gray-500">▾</span>
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-50 " style={{ backgroundColor: "grey", color: "white" }}>
                    {categories.map(cat => (
                        <Link key={cat.name} href={cat.href}>
                            <span
                                onClick={() => {
                                    setIsOpen(false);
                                    onClick?.();
                                }}
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                            >
                                {cat.name}
                            </span>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoriesDropdown;

