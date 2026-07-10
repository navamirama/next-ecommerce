// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const slides = [
//   {
//     id: 1,
//     title: "Summer Sale Collections",
//     img: "/Slider3.png",
//     url: "/",
//     bg: "bg-gradient-to-r from-yellow-50 to-pink-50",
//   },
//   {
//     id: 2,
//     title: "Winter Sale Collections",
//     img: "/Slider4.png",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 3,
//     title: "Winter Sale Collections",
//     img: "/Slider2.png",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   },
//   {
//     id: 4,
//     title: "Winter Sale Collections",
//     img: "/Slider4.png",
//     bg: "bg-gradient-to-r from-pink-50 to-blue-50",
//   }
// ];

// const Slider = () => {
//   const [current, setCurrent] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
//     }, 3000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="h-[calc(100vh-200px)] overflow-hidden border-8 border-white" style={{ border: "double", color: "white" }}>
//       <div
//         className="w-max h-full flex transition-all ease-in-out duration-1000"
//         style={{ transform: `translateX(-${current * 100}vw)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             className={`${slide.bg} w-screen h-full relative`}
//             key={slide.id}
//           >
//             <Image
//               src={slide.img}
//               alt={slide.title}
//               fill
//               sizes="100vw"
//               className="object-cover"
//               priority={slide.id === 1}
//             />
//             <Link
//               href="list?cat=new-arrivals"
//               className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded shadow-lg text-lg font-semibold hover:bg-gray-900 transition"
//               style={{ backgroundColor: "black", color: "white" }}
//             >
//               Shop Now
//             </Link>
//           </div>
//         ))}
//       </div>
//       <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">

//         {slides.map((slide, index) => (
//           <div
//             className={`w-3 h-3  rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${current === index ? "scale-150" : ""
//               }`}
//             key={slide.id}
//             onClick={() => setCurrent(index)}
//           >
//             {current === index && (
//               <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Slider;
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  url: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Customised Jersey's",
    subtitle: "SPORTS Jersey's",
    image: "/Slider5.png",
    url: "/sports",
  },
  {
    id: 2,
    title: "Mythology Collection",
    subtitle: "PREMIUM STREETWEAR",
    image: "/Slider2.png",
    url: "/list?cat=new-arrivals",
  },
  // {
  //   id: 3,
  //   title: "Mythology Collection",
  //   subtitle: "PREMIUM STREETWEAR",
  //   image: "/Slider2.png",
  //   url: "/list?cat=sports-jersey",
  // },
  {
    id: 4,
    title: "Anime Inspired",
    subtitle: "KULT ORIGINALS",
    image: "/Slider4.png",
    url: "/list?cat=anime",
  },
  {
    id: 5,
    title: "KULT ORIGINALS",
    subtitle: "New Street Uniform",
    image: "/Slider3.png",
    url: "/list?cat=kult-collections",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white mb-0">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${current * (100 / slides.length)}%)`,
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 bg-white"
            style={{ width: `${100 / slides.length}%` }}
          >
            <div className="flex flex-col md:flex-row md:min-h-[80vh]">
              {/* TEXT */}
              <div className="w-full md:w-[46%] flex flex-col items-center justify-center text-center px-6 pt-7 pb-4 md:py-0">
                <p className="uppercase tracking-[0.2em] text-black text-[10px] md:text-sm font-bold mb-2">
                  {slide.subtitle}
                </p>

                <h1 className="text-3xl sm:text-4xl md:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9] text-black max-w-[330px] md:max-w-none">
                  {slide.title}
                </h1>

                <Link href={slide.url} className="mt-6 md:mt-8">
                  <button className="bg-black text-white rounded-full px-8 py-3 font-semibold" style={{ backgroundColor: "black", color: "white" }}>
                    SHOP NOW
                  </button>
                </Link>
              </div>

              {/* IMAGE */}
              <div className="w-full md:w-[54%] flex items-start md:items-center justify-center px-3 md:px-8 pt-0 pb-0">
                <div className="relative w-full h-[205px] sm:h-[280px] md:h-[65vh]">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    priority={slide.id === 1}
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 54vw"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DOTS - hidden on mobile to save space */}
      <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`transition-all duration-300 ${current === index
              ? "w-8 h-2 bg-black rounded-full"
              : "w-2 h-2 bg-gray-300 rounded-full"
              }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Slider;
