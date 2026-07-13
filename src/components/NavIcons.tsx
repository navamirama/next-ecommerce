// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import CartModal from "./CartModal";
// import { useWixClient } from "@/hooks/useWixClient";
// import Cookies from "js-cookie";
// import { useCartStore } from "@/hooks/useCartStore";
// import { useClickOutside } from '@custom-react-hooks/use-click-outside';

// const NavIcons = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   useClickOutside(ref, () => setIsOpen(false));

//   const router = useRouter();
//   const pathName = usePathname();

//   const wixClient = useWixClient();
//   const isLoggedIn = wixClient.auth.loggedIn();

//   // TEMPORARY
//   // const isLoggedIn = false;

//   const handleProfile = () => {
//     if (!isLoggedIn) {
//       router.push("/login");
//     } else {
//       setIsProfileOpen((prev) => !prev);
//     }
//   };

//   // AUTH WITH WIX-MANAGED AUTH

//   // const wixClient = useWixClient();

//   // const login = async () => {
//   //   const loginRequestData = wixClient.auth.generateOAuthData(
//   //     "http://localhost:3000"
//   //   );

//   //   console.log(loginRequestData);

//   //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
//   //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
//   //   window.location.href = authUrl;
//   // };

//   const handleLogout = async () => {
//     setIsLoading(true);
//     Cookies.remove("refreshToken");
//     const { logoutUrl } = await wixClient.auth.logout(window.location.href);
//     setIsLoading(false);
//     setIsProfileOpen(false);
//     router.push(logoutUrl);
//   };


//   const { cart, counter, getCart } = useCartStore();

//   useEffect(() => {
//     getCart(wixClient);
//   }, [wixClient, getCart]);

//   return (
//     <div ref={ref} className="flex items-center gap-4 xl:gap-6 relative">
//       <Image
//         src="/profile.png"
//         alt=""
//         width={22}
//         height={22}
//         className="cursor-pointer"
//         // onClick={login}
//         onClick={handleProfile}
//       />
//       {isProfileOpen && (
//         <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
//           <Link href="/profile">Profile</Link>
//           <div className="mt-2 cursor-pointer" onClick={handleLogout}>
//             {isLoading ? "Logging out" : "Logout"}
//           </div>
//         </div>
//       )}
//       <Image
//         src="/notification.png"
//         alt=""
//         width={22}
//         height={22}
//         className="cursor-pointer"
//       />
//       <div
//         className="relative cursor-pointer z-20"
//         onClick={() => setIsCartOpen((prev) => !prev)}
//       >

//         <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center" style={{ backgroundColor: "white", color: "black" }}>

//           <Image src="/cart.png" alt="" width={22} height={22} /> {counter}
//         </div>
//       </div>
//       <div >

//         <button onClick={() => setIsOpen(true)}>
//           {isCartOpen && <CartModal />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NavIcons;

// working code below

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect, useState, useRef } from "react";
// import CartModal from "./CartModal";
// import { useWixClient } from "@/hooks/useWixClient";
// import Cookies from "js-cookie";
// import { useCartStore } from "@/hooks/useCartStore";
// import { useClickOutside } from "@custom-react-hooks/use-click-outside";

// const NavIcons = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
//   const pathName = usePathname();

//   const wixClient = useWixClient();
//   const isLoggedIn = wixClient.auth.loggedIn();

//   const handleProfile = () => {
//     if (!isLoggedIn) {
//       router.push("/login");
//     } else {
//       setIsProfileOpen((prev) => !prev);
//     }
//   };

//   const handleLogout = async () => {
//     setIsLoading(true);
//     Cookies.remove("refreshToken");
//     const { logoutUrl } = await wixClient.auth.logout(window.location.href);
//     setIsLoading(false);
//     setIsProfileOpen(false);
//     router.push(logoutUrl);
//   };

//   const { cart, counter, getCart } = useCartStore();

//   useEffect(() => {
//     getCart(wixClient);
//   }, [wixClient, getCart]);

//   // Close modals when clicking outside
//   const ref = useRef<HTMLDivElement>(null);
//   useClickOutside(ref, () => {
//     setIsProfileOpen(false);
//     setIsCartOpen(false);
//   });

//   return (
//     <div ref={ref} className="flex items-center gap-4 xl:gap-6 relative">
//       {/* Profile */}
//       <Image
//         src="/profile.png"
//         alt=""
//         width={22}
//         height={22}
//         className="cursor-pointer"
//         onClick={handleProfile}
//       />
//       {isProfileOpen && (
//         <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
//           <Link href="/profile">Profile</Link>
//           <div className="mt-2 cursor-pointer" onClick={handleLogout}>
//             {isLoading ? "Logging out" : "Logout"}
//           </div>
//         </div>
//       )}

//       {/* Notifications */}
//       <Image
//         src="/notification.png"
//         alt=""
//         width={22}
//         height={22}
//         className="cursor-pointer"
//       />

//       {/* Cart */}
//       <div
//         className="relative cursor-pointer z-20"
//         onClick={() => setIsCartOpen((prev) => !prev)}
//       >
//         <Image src="/cart.png" alt="" width={22} height={22} />
//         <div className="absolute -top-2 -right-2 w-5 h-5 bg-black rounded-full text-white text-xs flex items-center justify-center">
//           {counter}
//         </div>
//       </div>

//       {/* Cart Modal */}
//       <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </div>
//   );
// };

// export default NavIcons;

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState, useRef } from "react";
// import CartModal from "./CartModal";
// import { useWixClient } from "@/hooks/useWixClient";
// import Cookies from "js-cookie";
// import { useCartStore } from "@/hooks/useCartStore";
// import { useClickOutside } from '@custom-react-hooks/use-click-outside';

// const NavIcons = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const ref = useRef<HTMLDivElement>(null);
//   useClickOutside(ref, () => setIsProfileOpen(false));

//   const router = useRouter();
//   const wixClient = useWixClient();
//   const isLoggedIn = wixClient.auth.loggedIn();
//   const { counter } = useCartStore();

//   const handleProfile = () => {
//     if (!isLoggedIn) router.push("/login");
//     else setIsProfileOpen((prev) => !prev);
//   };

//   const handleLogout = async () => {
//     setIsLoading(true);
//     Cookies.remove("refreshToken");
//     const { logoutUrl } = await wixClient.auth.logout(window.location.href);
//     setIsLoading(false);
//     setIsProfileOpen(false);
//     router.push(logoutUrl);
//   };

//   return (
//     <div ref={ref} className="flex items-center gap-4 xl:gap-6 relative" style={{ backgroundColor: "white", color: "white" }}>
//       {/* Profile */}
//       <Image
//         src="/profile.png"
//         alt="Profile"
//         width={22}
//         height={22}
//         className="cursor-pointer"
//         onClick={handleProfile}
//       />
//       {isProfileOpen && (
//         <div className="absolute p-4 rounded-md top-12 left-0 bg-white shadow-md z-20">
//           <Link href="/profile">Profile</Link>
//           <div className="mt-2 cursor-pointer" onClick={handleLogout}>
//             {isLoading ? "Logging out..." : "Logout"}
//           </div>
//         </div>
//       )}

//       {/* Cart Icon */}
//       <div className="relative cursor-pointer" onClick={() => setIsCartOpen(true)}>
//         <Image src="/cart.png" alt="Cart" width={22} height={22} />
//         {counter > 0 && (
//           <div className="absolute -top-2 -right-2 w-5 h-5 bg-black text-white text-xs flex items-center justify-center rounded-full" style={{ backgroundColor: "black", color: "white" }}>
//             {counter}
//           </div>
//         )}
//       </div>

//       {/* Cart Modal */}
//       <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </div>
//   );
// };

// export default NavIcons;


"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import Cookies from "js-cookie";

import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import { useCartStore } from "@/hooks/useCartStore";
import { useClickOutside } from "@custom-react-hooks/use-click-outside";

const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const router = useRouter();
  const wixClient = useWixClient();
  const { counter } = useCartStore();

  const isLoggedIn = wixClient.auth.loggedIn();

  useClickOutside(profileRef, () => {
    setIsProfileOpen(false);
  });

  const openProfileMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsProfileOpen(true);
  };

  const scheduleProfileClose = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsProfileOpen(false);
    }, 180);
  };

  const toggleProfileMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsProfileOpen((previous) => !previous);
  };

  const closeProfileMenu = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    setIsProfileOpen(false);
  };

  const handleLogin = () => {
    closeProfileMenu();
    router.push("/login");
  };

  const handleOrders = () => {
    closeProfileMenu();
    router.push(isLoggedIn ? "/orders" : "/login");
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);

      Cookies.remove("refreshToken");

      const { logoutUrl } = await wixClient.auth.logout(
        window.location.origin
      );

      closeProfileMenu();
      window.location.href = logoutUrl;
    } catch (error) {
      console.error("Unable to log out:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex items-center gap-4 xl:gap-6">
      {/* PROFILE */}
      <div
        ref={profileRef}
        className="relative"
        onMouseEnter={openProfileMenu}
        onMouseLeave={scheduleProfileClose}
      >
        <button
          type="button"
          onClick={toggleProfileMenu}
          aria-label="Open account menu"
          aria-expanded={isProfileOpen}
          className="
    flex h-10 w-10 items-center justify-center rounded-full
    bg-white text-black
    transition
    hover:bg-zinc-200
    md:bg-white
  "
        >
          <Image
            src="/profile.png"
            alt=""
            width={22}
            height={22}
            className="object-contain"
          />
        </button>

        {isProfileOpen && (
          <>
            {/* Invisible bridge between icon and dropdown */}
            <div className="absolute right-0 top-full hidden h-4 w-52 md:block" />

            <div
              className="
                absolute bottom-full right-0 z-[100] mb-3
                w-52 overflow-hidden rounded-xl
                border border-zinc-200 bg-white
                text-sm text-zinc-900
                shadow-[0_12px_35px_rgba(0,0,0,0.18)]

                md:bottom-auto md:top-[calc(100%+12px)] md:mb-0
              "
              onMouseEnter={openProfileMenu}
              onMouseLeave={scheduleProfileClose}
            >
              <div className="bg-white p-2">
                {!isLoggedIn && (
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition hover:bg-zinc-100"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100">
                      ↪
                    </span>

                    Log in
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleOrders}
                  className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium transition hover:bg-zinc-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100">
                    ▣
                  </span>

                  My Orders
                </button>

                {isLoggedIn && (
                  <>
                    <Link
                      href="/profile"
                      onClick={closeProfileMenu}
                      className="flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition hover:bg-zinc-100"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100">
                        ●
                      </span>

                      My Profile
                    </Link>

                    <div className="my-1 border-t border-zinc-200" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50">
                        ←
                      </span>

                      {isLoading ? "Logging out..." : "Log out"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* CART */}
      <button
        type="button"
        onClick={() => setIsCartOpen(true)}
        aria-label={`Open cart with ${counter} items`}
        className="
    relative flex h-10 w-10 items-center justify-center rounded-full
    bg-white text-black
    transition
    hover:bg-zinc-200
  "
      >
        <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          className="object-contain"
        />

        {counter > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C96A3D] px-1 text-[11px] font-bold text-white">
            {counter > 99 ? "99+" : counter}
          </span>
        )}
      </button>

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </div>
  );
};

export default NavIcons;