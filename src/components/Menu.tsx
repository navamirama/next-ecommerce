// 'use client'

// import { useState } from "react"
// import Image from 'next/image'
// import Link from "next/link"
// const Menu = () => {

//   const [open, setOpen] = useState(false)
//   return (
//     <div className=''>
//       <Image alt="" src="/menu.png" width={28} height={28} className="cursor-pointer" onClick={() => setOpen((prev) => !prev)} />
//       {
//         open && (
//           <div className="absolute bg-black text-white left-0 top-20 w-full h-10 flex-col items-center justify-center gap-3  z-10">
//             <Link href="/" > HomePage</Link>
//             <Link href="/" > Shop</Link>
//             <Link href="/" > About</Link>
//             <Link href="/" > Contact</Link>
//             <Link href="/" > Logout</Link>
//             <Link href="/" > Cart</Link>
//           </div>
//         )
//       }
//     </div>
//   )
// }

// export default Menu

//absolute bg-black text-white left-0 top-20 w-full h-10 flex flex-col items-center justify-center gap-3 text-xl  z-1

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react"; // npm install lucide-react
import CategoriesDropdownServer from "./CategoriesDropdownServer";
import SearchBar from "./SearchBar";
import NavIcons from "./NavIcons";

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-64">
            <div className="flex items-center justify-between h-20">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={140}
                        height={60}
                        className="object-contain"
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-gray-700 text-base font-medium">
                    <Link href="/">Home</Link>
                    <div className="text-base font-medium text-gray-700">
                        <CategoriesDropdownServer />
                    </div>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>

                {/* Search + Icons (Desktop) */}
                <div className="hidden md:flex items-center gap-6">
                    <SearchBar />
                    <NavIcons />
                </div>

                {/* Hamburger Menu Button (Mobile) */}
                <button
                    className="md:hidden p-2 text-gray-700"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden flex flex-col gap-4 pb-4 text-gray-700 text-base font-medium">
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                        Home
                    </Link>
                    <div onClick={() => setMobileOpen(false)}>
                        <CategoriesDropdownServer />
                    </div>
                    <Link href="/about" onClick={() => setMobileOpen(false)}>
                        About
                    </Link>
                    <Link href="/contact" onClick={() => setMobileOpen(false)}>
                        Contact
                    </Link>
                    {/* Search + Icons for Mobile */}
                    <SearchBar />
                    <NavIcons />
                </div>
            )}
        </nav>
    );
}
