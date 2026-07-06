// import { useWixClient } from "@/hooks/useWixClient";
// import { wixClientServer } from "@/lib/wixClientServer";
// import Image from "next/image";
// import Link from "next/link";

// const CategoryList = async () => {
//   const wixClient = await wixClientServer();

//   const categories = await wixClient.collections.queryCollections().find();
//   return (
//     <div className="px-4 overflow-x-scroll scrollbar-hide">
//       <div className="flex gap-4 md:gap-8">
//         {categories.items.map((item) => (
//           <Link
//             href={`/list?cat=${item.slug}`}
//             className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
//             key={item._id}
//           >
//             <div className="relative bg-slate-100 w-full h-96">
//               <Image
//                 src={item.media?.mainMedia?.image?.url || ""}
//                 alt=""
//                 fill
//                 sizes="20vw"
//                 className="object-cover"
//               />
//             </div>
//             <h1 className="mt-8 font-light text-xl tracking-wide">
//               {item.name}
//             </h1>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;

import { wixClientServer } from "@/lib/wixClientServer";
import Image from "next/image";
import Link from "next/link";

const colors = [
  "bg-yellow-400",
  "bg-pink-500",
  "bg-red-500",
  "bg-black",
  "bg-green-400",
  "bg-orange-400",
  "bg-blue-500",
  "bg-purple-500",
];

const CategoryList = async () => {
  const wixClient = await wixClientServer();

  const categories = await wixClient.collections.queryCollections().find();

  return (
    <section className="w-full bg-white px-4 md:px-8 py-8 md:py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-10">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          Categories
        </h2>

        <Link
          href="/list"
          className="flex items-center gap-2 text-sm md:text-base font-semibold hover:gap-3 transition-all"
        >
          View all
          <span className="text-2xl">→</span>
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.items.map((item, index) => (
          <Link
            href={`/list?cat=${item.slug}`}
            key={item._id}
            className="
           group
           block
           rounded-2xl
           overflow-hidden
           bg-white
           shadow-sm
           transition-all
           duration-300
           hover:-translate-y-1
           hover:shadow-xl
         "
          >
            <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm hover:shadow-xl transition-all duration-500">

              {/* Image */}
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.media?.mainMedia?.image?.url || "/placeholder.png"}
                  alt={item.name || ""}
                  fill
                  sizes="(max-width:768px) 50vw,25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* White Glass Panel */}
              {/* Category Card */}
              <div className="absolute bottom-0 left-0 right-0 bg-white px-5 py-3" style={{ backgroundColor: "white" }}>

                <div className="flex items-end justify-between">

                  <div>

                    <div className="w-10 h-1 rounded-full bg-[#D4AF37] mb-3" />

                    <h3 className="text-base md:text-xl font-black uppercase leading-tight">
                      {item.name}
                    </h3>

                  </div>

                  <div
                    className="
    w-10
    h-10
    rounded-full
    border
    border-gray-300
    flex
    items-center
    justify-center
    transition-all
    duration-300
    group-hover:bg-black
    group-hover:border-black
"
                  >
                    <span
                      className="
      text-xl
      transition-transform
      duration-300
      group-hover:translate-x-1
      group-hover:text-white
    "
                    >
                      →
                    </span>
                  </div>

                </div>

              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;