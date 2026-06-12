"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Summer Sale Collections",
    // description: "Sale! Up to 50% off!",
    // img: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
    img: "/Slider1.png",
    url: "/",
    bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
  },
  {
    id: 2,
    title: "Winter Sale Collections",
    // description: "Sale! Up to 50% off!",
    // img: "https://images.pexels.com/photos/26316180/pexels-photo-26316180/free-photo-of-woman-holding-brown-leather-bag.jpeg?auto=compress&cs=tinysrgb&w=600",
    img: "/Slider2.png",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  // {
  //   id: 3,
  //   title: "Spring Sale Collections",
  //   description: "Sale! Up to 50% off!",
  //   img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   url: "/",
  //   bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  // },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[calc(100vh-200px)] overflow-hidden border-8 border-white" style={{ border: "double", color: "white" }}>
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`${slide.bg} w-screen h-full relative`}
            key={slide.id}
          >
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              sizes="100vw"
              className="object-cover"
              priority={slide.id === 1}
            />
            <Link
              href="list?cat=anime"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg text-lg font-semibold hover:bg-gray-900 transition"
              style={{ backgroundColor: "black", color: "white" }}
            >
              Shop Now
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">

        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""
              }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
