// import Link from "next/link"
// import Image from "next/image"
// import NavIcons from "./NavIcons"
// import SearchBar from "./SearchBar"
// import CategoriesDropdownServer from "./CategoriesDropdownServer"
import Menu from "./Menu"

// const Navbar = () => {
//   return (
//     <div className='h-20 px-4 md:px-8 lg:px-16 xl:3px-2 2xl:px:64 relative'>
//       {/* Mobile screen */}
//       {/* <div className="h-full flex items-center justify-between md:hidden">

//         <Link href="/" > <div className="text-2xl tracking-wide" > Vela Prints </div></Link>

//         <Menu />

//       </div> */}
//       {/* Bigger screens */}
//       <div className=" md:flex items-center justify-between gap-8 h-full">
//         {/* LEFT */}
//         <div className="flex items-center gap-12"> </div>
//         <Link href="/" className="flex items-center gap-3">
//           <Image alt="" src="/logo.png" width={245} height={205} className=" xl:flex gap-4 pt-16 pl-20" />
//           {/* <div className="text-2xl tracking-wide" > Vela Prints </div> */}
//         </Link>
//         <div className=" xl:flex gap-4 pt-10">
//           <Link href="/">Home</Link>
//           {/* <Link href="/" className="md:px-8 lg:px-16">Categories</Link> */}
//           {/* <CategoriesDropdown /> */}

//           <div><CategoriesDropdownServer /></div>
//           {/* <Link href="/">Deals</Link> */}
//           <Link href="/about">About</Link>
//           <Link href="/contact">Contact</Link>
//         </div>
//         {/* RIGHT */}
//         <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">

//           <SearchBar />


//           <NavIcons />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar


// const Navbar = () => {
//   return (
//     <nav className="h-20 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-64 bg-white shadow-sm">
//       <div className="flex items-center justify-between h-full">

//         {/* LEFT - Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             alt="Logo"
//             src="/logo.png"
//             width={140}
//             height={60}
//             className="object-contain"
//           />
//         </Link>

//         {/* CENTER - Navigation Links */}
//         <div className="hidden md:flex items-center gap-8 text-gray-700 text-base font-medium">
//           <Link href="/">Home</Link>
//           <div className="flex items-center text-base font-medium text-gray-700">
//             <CategoriesDropdownServer />
//           </div>
//           <Link href="/about">About</Link>
//           <Link href="/contact">Contact</Link>
//         </div>

//         {/* RIGHT - Search & Icons */}
//         <div className="flex items-center gap-6">
//           <SearchBar />
//           <NavIcons />
//         </div>
//       </div>

//       {/* MOBILE MENU - Uncomment and adapt */}

//       <div className="md:hidden flex justify-between items-center h-full">
//         <Link href="/" className="text-lg font-semibold">Vela Prints</Link>
//         <Menu />
//       </div>

//     </nav>
//   );
// };

// export default Navbar;


// const Navbar = () => {
//   return (
//     <nav className="bg-white shadow-sm px-4 md:px-8 lg:px-11 xl:px-20 2xl:px-64">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">

//         {/* LEFT - Logo */}
//         <Link href="/" className="flex items-center">
//           <Image
//             alt="Logo"
//             src="/logo.png"
//             width={140}
//             height={60}
//             className="object-contain"
//           />
//         </Link>

//         {/* CENTER - Navigation Links */}
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-gray-700 text-base font-medium">
//           <Link href="/">Home</Link>
//           <CategoriesDropdownServer />
//           <Link href="/about">About</Link>
//           <Link href="/contact">Contact</Link>
//         </div>

//         {/* RIGHT - Search & Icons */}
//         <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-0">
//           <SearchBar />
//           <NavIcons />
//         </div>

//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// const Navbar = () => {
//   return (
//     <nav className="px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-64 bg-white shadow-sm">

//       {/* TOP ROW: Logo + Icons */}
//       <div className="flex items-center justify-between h-16 md:h-20">
//         <Link href="/" className="flex items-center">
//           <Image
//             alt="Logo"
//             src="/logo.png"
//             width={140}
//             height={60}
//             className="object-contain"
//           />
//         </Link>

//         <div className="flex items-center gap-4">
//           <div className="hidden md:block">
//             <SearchBar />
//           </div>
//           <NavIcons />
//         </div>
//       </div>

//       {/* LINKS ROW - Desktop */}
//       <div className="hidden md:flex justify-center gap-8 text-gray-700 text-base font-medium">
//         <Link href="/">Home</Link>
//         <CategoriesDropdownServer />
//         <Link href="/about">About</Link>
//         <Link href="/contact">Contact</Link>
//       </div>

//       {/* LINKS ROW - Mobile */}
//       <div className="flex md:hidden justify-end gap-4 mt-2 text-gray-700 text-sm font-medium">
//         <Link href="/">Home</Link>
//         <CategoriesDropdownServer />
//         <Link href="/about">About</Link>
//         <Link href="/contact">Contact</Link>
//       </div>

//     </nav>
//   );
// };

// export default Navbar;

//working code below
// import MobileMenu from "./MobileMenu"; // client-side hamburger
// import { wixClientServer } from "@/lib/wixClientServer";
// import CategoriesDropdownClient from "./CategoriesDropdownClient"

// interface Category {
//   _id?: string;
//   name: string;
//   href: string;
// }

// export const Navbar = async () => {
//   const wixClient = await wixClientServer();

//   const result = await wixClient.collections.queryCollections().find();

//   console.log("RES", result);
//   const categories: Category[] = result.items.map((col: any) => ({
//     id: col._id,
//     name: col.name,
//     href: col.url?.relative || `${col.slug}`,
//   }));
//   console.log("CATeG", categories);

//   return (
//     <nav className="h-20 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-64 bg-white shadow-sm">
//       <div className="flex items-center justify-between h-full">
//         {/* Logo */}
//         <Link href="/" className="flex items-center">
//           <Image src="/logo.png" alt="Logo" width={140} height={60} className="object-contain" />
//         </Link>

//         {/* Desktop Nav */}
//         <div className="hidden md:flex items-center gap-8 text-gray-700 text-base font-medium">
//           <Link href="/">Home</Link>
//           <CategoriesDropdownServer />
//           <Link href="/about">About</Link>
//           <Link href="/contact">Contact</Link>
//         </div>

//         {/* Right Icons */}
//         <div className="hidden md:flex items-center gap-6">
//           <SearchBar />
//           <NavIcons />
//         </div>

//         {/* Mobile Hamburger */}
//         <div className="md:hidden">
//           <MobileMenu categories={categories} />
//           <NavIcons />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu"; // client-side hamburger
import { wixClientServer } from "@/lib/wixClientServer";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";
import CategoriesDropdownServer from "./CategoriesDropdownServer";

interface Category {
  _id?: string;
  name: string;
  href: string;
}

export const Navbar = async () => {
  const wixClient = await wixClientServer();
  const result = await wixClient.collections.queryCollections().find();

  const categories: Category[] = result.items.map((col: any) => ({
    id: col._id,
    name: col.name,
    href: col.url?.relative || `${col.slug}`,
  }));

  return (
    <nav className="h-20 px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-64 bg-white shadow-sm relative z-50">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={140} height={60} className="object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-gray-700 text-base font-medium">
          <Link href="/">Home</Link>
          <CategoriesDropdownServer />
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* Right Icons Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <SearchBar />
          <NavIcons />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-4">
          <MobileMenu categories={categories} />
        </div>
      </div>

      {/* Mobile NavIcons fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-lg p-2 flex justify-end gap-4" style={{ backgroundColor: "white", color: "white" }}>
        <NavIcons />
      </div>
    </nav>
  );
};

export default Navbar;
