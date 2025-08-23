// "use client";

// import Image from "next/image";
// import { useState } from "react";

// const ProductImages = ({ items }: { items: any }) => {
//   const [index, setIndex] = useState(0);

//   //   const images = [
//   //     {
//   //       id: 1,
//   //       url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   //     },
//   //     {
//   //       id: 2,
//   //       url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   //     },
//   //     {
//   //       id: 3,
//   //       url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   //     },
//   //     {
//   //       id: 4,
//   //       url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   //     },
//   //   ];

//   return (
//     <div className="">
//       <div className="h-[500px] relative">
//         <Image
//           src={items[index].image?.url}
//           alt=""
//           fill
//           sizes="7000vw"
//           // className="object-cover rounded-md"
//           className="object-contain rounded-md"
//         />
//       </div>
//       <div className="flex justify-between gap-4 mt-8">
//         {items.map((item: any, i: number) => (
//           <div
//             className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer"
//             key={item._id}
//             onClick={() => setIndex(i)}
//           >
//             <Image
//               src={item.image?.url}
//               alt=""
//               fill
//               sizes="30vw"
//               className="object-cover rounded-md"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductImages;

"use client";

import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div>
      {/* Main Image with Hover Zoom */}
      <div
        className="h-[500px] relative overflow-hidden border rounded-md bg-white"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="700px"
          className={`object-contain transition-transform duration-300 ${isZoomed ? "scale-150" : "scale-100"
            }`}
          style={{
            transformOrigin: `${position.x}% ${position.y}%`,
          }}
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-between gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div
            key={item._id}
            className={`w-1/4 h-32 relative cursor-pointer ${i === index ? "ring-2 ring-blue-500" : ""
              }`}
            onClick={() => setIndex(i)}
          >
            <Image
              src={item.image?.url}
              alt=""
              fill
              sizes="30vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

