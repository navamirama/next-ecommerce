// "use client";

// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// interface Category {
//     _id?: string;
//     name: string;
//     href: string;
// }

// export default function MobileMenu({ categories }: { categories: Category[] }) {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div>
//             {/* Hamburger Icon */}
//             <button onClick={() => setIsOpen(!isOpen)}>
//                 {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>

//             {/* Dropdown */}
//             {isOpen && (
//                 <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4 z-50">
//                     <ul className="flex flex-col gap-4">

//                         {categories.map((cat) => (
//                             <li key={cat._id}>
//                                 <a
//                                     href={`/category/${cat.href}`}
//                                     className="block text-lg"
//                                     onClick={() => setIsOpen(false)}
//                                 >
//                                     {cat.name}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             )}
//         </div>
//     );
// }

"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useClickOutside } from '@custom-react-hooks/use-click-outside';

interface Category {
    _id?: string;
    name: string;
    href: string;
}

interface MobileMenuProps {
    categories: Category[];
}

const MobileMenu = ({ categories }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Hamburger Icon */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 right-4 p-3 border border-red-500 bg-white z-[9999]" style={{ backgroundColor: "white", color: "white" }}
            >
                <div className="space-y-1">
                    <span className="block w-6 h-0.5 bg-black" style={{ backgroundColor: "#000000", color: "white" }}></span>
                    <span className="block w-6 h-0.5 bg-black" style={{ backgroundColor: "#000000", color: "white" }}></span>
                    <span className="block w-6 h-0.5 bg-black" style={{ backgroundColor: "#000000", color: "white" }}></span>
                </div>
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-[9998]"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Sliding Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-gray-50 shadow-lg z-[9999] transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`} style={{ backgroundColor: "grey", color: "white" }}
            >
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="p-4 text-gray-700 text-lg font-bold"
                >
                    ✕
                </button>

                {/* Menu Links */}
                <nav className="flex flex-col gap-4 px-6 mt-4 text-gray-700 text-base font-medium">
                    {[
                        { name: "Home", href: "/" },

                        ...categories.map((cat) => ({
                            name: cat.name,
                            href: `/list?cat=${cat.href}`,
                        })),
                        { name: "About", href: "/about" },
                        { name: "Contact", href: "/contact" },
                    ].map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
// http://localhost:3004/category/categories/category/anime
// http://localhost:3004/categories/category/featured
// http://localhost:3004/list?cat=featured
// http://localhost:3004/list?cat=/category/featured
// http://localhost:3004/list?cat=/category/featured


