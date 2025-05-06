import Link from "next/link"
import Menu from "./Menu"
import Image from "next/image"
import NavIcons from "./NavIcons"
import SearchBar from "./SearchBar"

const Navbar = () => {
    return (
      <div className='h-20 px-4 md:px-8 lg:px-16 xl:3px-2 2xl:px:64 relative'>
        {/* Mobile screen */}
        <div className="h-full flex items-center justify-between md:hidden"> 
            
            <Link href="/" > <div className="text-2xl tracking-wide" > Vela Prints </div></Link>

        <Menu />

        </div>
        {/* Bigger screens */}
        <div className="hidden md:flex items-center justify-between gap-8 h-full">
            {/* LEFT */}
            <div className="w-1/3 xl:w-1/2 flex items-center gap-12"> </div>
            <Link href="/" className="flex items-center gap-3"> 
            <Image alt ="" src= "/logo.png" width={24} height={24} />
            <div className="text-2xl tracking-wide" > Vela Prints </div>
            </Link>
            {/* RIGHT */}
            <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
                <SearchBar />
                <NavIcons />
                 </div>
             </div>
      </div>
    )
  }
  
  export default Navbar