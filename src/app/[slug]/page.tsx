// import Add from "@/components/Add";
// import CustomizeProduct from "@/components/CustomizeProduct";
// import ProductImages from "@/components/ProductImages";
// import Reviews from "@/components/Reviews";
// import { wixClientServer } from "@/lib/wixClientServer";
// import DOMPurify from "isomorphic-dompurify";
// import { notFound } from "next/navigation";
// import { Suspense } from "react";

// const SinglePage = async ({ params }: { params: { slug: string } }) => {
//   const wixClient = await wixClientServer();

//   const products = await wixClient.products
//     .queryProducts()
//     .eq("slug", params.slug)
//     .find();

//   if (!products.items[0]) {
//     return notFound();
//   }

//   const product = products.items[0];
//   console.log('CUSTOm SLUG', params.slug);

//   const reviewRes = await fetch(
//     `https://api.fera.ai/v3/public/reviews?product.id=${product._id}&public_key=${process.env.NEXT_PUBLIC_FERA_ID}`
//   );
//   const reviews = await reviewRes.json();
//   console.log(reviews);

//   return (
//     <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16 top-20 pr-8">
//       {/* IMG */}
//       <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
//         <ProductImages items={product.media?.items} />
//       </div>
//       {/* TEXTS */}
//       <div className="w-full lg:w-1/2 flex flex-col gap-6">
//         <h1 className="text-4xl font-medium">{product.name}</h1>
//         {/* <p className="text-gray-500">{`${product.description}`}</p> */}

//         <div
//           className="text-sm text-gray-500"
//           dangerouslySetInnerHTML={{
//             __html: DOMPurify.sanitize(product.description),
//           }}
//         ></div>
//         <div className="h-[2px] bg-gray-100" />
//         {product.price?.price === product.price?.discountedPrice ? (
//           <h2 className="font-medium text-2xl">£{product.price?.price}</h2>
//         ) : (
//           <div className="flex items-center gap-4">
//             <h3 className="text-xl text-gray-500 line-through">
//               £{product.price?.price}
//             </h3>
//             <h2 className="font-medium text-2xl">
//               £{product.price?.discountedPrice}
//             </h2>
//           </div>
//         )}
//         <div className="h-[2px] bg-gray-100" />
//         {product.variants?.length && product.productOptions?.length ? (
//           <CustomizeProduct
//             productId={product._id!}
//             variants={product.variants}
//             productOptions={product.productOptions}
//           />
//         ) : (
//           <Add
//             productId={product._id!}
//             variantId=""
//             stockNumber={product.stock?.quantity ?? 0}
//             isSelectionComplete={true}
//           />
//         )}
//         <div className="h-[2px] bg-gray-100" />
//         {product.additionalInfoSections?.map((section: any) => (
//           <div className="text-sm" key={section.title}>
//             <h4 className="font-medium mb-4">{section.title}</h4>
//             <p>{section.description}</p>
//           </div>
//         ))}
//         <div className="h-[2px] bg-gray-100" />
//         {/* <h1 className="text-2xl">How do you submit your custom message and design??</h1> */}
//         {/* {params.slug === "custom-print" && (
//           <div className="my-6 p-4 bg-yellow-100 border border-yellow-400 rounded">
//             <p className="text-lg">
//               Please drop us a WhatsApp with your custom message and design on +44 7474163199 with your order number.<br />
//               Please select the apparel size and which side you prefer the design from the above options.
//             </p>
//           </div>
//         )} */}


//         {/* PRODUCT REVIEWS */}
//         <h1 className="text-2xl">User Reviews</h1>
//         <Suspense fallback="Loading...">
//           <Reviews productId={product._id!} />
//         </Suspense>
//       </div>
//     </div>
//   );
// };

// export default SinglePage;

import Add from "@/components/Add";
import CustomizeProduct from "@/components/CustomizeProduct";
import ProductImages from "@/components/ProductImages";
import Reviews from "@/components/Reviews";
import { wixClientServer } from "@/lib/wixClientServer";
import DOMPurify from "isomorphic-dompurify";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type SinglePageProps = {
  params: {
    slug: string;
  };
};

const SinglePage = async ({ params }: SinglePageProps) => {
  const wixClient = await wixClientServer();

  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  const product = products.items[0];

  if (!product) {
    return notFound();
  }

  const hasProductOptions =
    Boolean(product.variants?.length) &&
    Boolean(product.productOptions?.length);

  const description = product.description ?? "";

  return (
    <div className="relative top-20 flex flex-col gap-16 px-4 pr-8 md:px-8 lg:flex-row lg:px-16 xl:px-32 2xl:px-64">
      {/* Product images */}
      <div className="h-max w-full lg:sticky lg:top-20 lg:w-1/2">
        <ProductImages items={product.media?.items ?? []} />
      </div>

      {/* Product information */}
      <div className="flex w-full flex-col gap-6 lg:w-1/2">
        <h1 className="text-4xl font-medium">{product.name}</h1>

        <div
          className="text-sm text-gray-500"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(description),
          }}
        />

        <div className="h-[2px] bg-gray-100" />

        {product.price?.price === product.price?.discountedPrice ? (
          <h2 className="text-2xl font-medium">
            £{product.price?.price}
          </h2>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-xl text-gray-500 line-through">
              £{product.price?.price}
            </h3>

            <h2 className="text-2xl font-medium">
              £{product.price?.discountedPrice}
            </h2>
          </div>
        )}

        <div className="h-[2px] bg-gray-100" />

        {hasProductOptions ? (
          <CustomizeProduct
            productId={product._id!}
            variants={product.variants ?? []}
            productOptions={product.productOptions ?? []}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId=""
            stockNumber={product.stock?.quantity ?? 0}
            isSelectionComplete
          />
        )}

        <div className="h-[2px] bg-gray-100" />

        {product.additionalInfoSections?.map((section) => (
          <div className="text-sm" key={section.title}>
            <h4 className="mb-4 font-medium">
              {section.title}
            </h4>

            <p>{section.description}</p>
          </div>
        ))}

        <div className="h-[2px] bg-gray-100" />

        {params.slug === "custom-print" && (
          <div className="rounded border border-yellow-400 bg-yellow-100 p-4">
            <p className="text-base">
              After placing your order, please send your design or message
              through WhatsApp with your order number. Please also select the
              garment size and required print side above.
            </p>
          </div>
        )}

        <h2 className="text-2xl">User Reviews</h2>

        <Suspense fallback={<p>Loading reviews...</p>}>
          <Reviews productId={product._id!} />
        </Suspense>
      </div>
    </div>
  );
};

export default SinglePage;
