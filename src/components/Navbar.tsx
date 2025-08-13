import Link from "next/link"
import Image from "next/image"
import NavIcons from "./NavIcons"
import SearchBar from "./SearchBar"
import CategoriesDropdownServer from "./CategoriesDropdownServer"
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


const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-64 py-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">

        {/* LEFT - Logo */}
        <Link href="/" className="flex items-center">
          <Image
            alt="Logo"
            src="/logo.png"
            width={140}
            height={60}
            className="object-contain"
          />
        </Link>

        {/* CENTER - Navigation Links */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 text-gray-700 text-base font-medium">
          <Link href="/">Home</Link>
          <CategoriesDropdownServer />
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        {/* RIGHT - Search & Icons */}
        <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-0">
          <SearchBar />
          <NavIcons />
        </div>

      </div>
    </nav>
  );
};

export default Navbar;

