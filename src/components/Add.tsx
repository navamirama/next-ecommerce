// "use client";

// import { useCartStore } from "@/hooks/useCartStore";
// import { useWixClient } from "@/hooks/useWixClient";
// import { useState } from "react";

// const Add = ({
//   productId,
//   variantId,
//   stockNumber,
// }: {
//   productId: string;
//   variantId: string;
//   stockNumber: number;
// }) => {
//   const [quantity, setQuantity] = useState(1);

//   // // TEMPORARY
//   // const stock = 4;

//   const handleQuantity = (type: "i" | "d") => {
//     if (type === "d" && quantity > 1) {
//       setQuantity((prev) => prev - 1);
//     }
//     if (type === "i" && quantity < stockNumber) {
//       setQuantity((prev) => prev + 1);
//     }
//   };

//   const wixClient = useWixClient();

//   const { addItem, isLoading } = useCartStore();

//   // const addItem = async () => {
//   //   const response = await wixClient.currentCart.addToCurrentCart({
//   //     lineItems: [
//   //       {
//   //         catalogReference: {
//   //           appId: process.env.NEXT_PUBLIC_WIX_APP_ID!,
//   //           catalogItemId: productId,
//   //           ...(variantId && { options: { variantId } }),
//   //         },
//   //         quantity: quantity,
//   //       },
//   //     ],
//   //   });
//   // };

//   return (
//     <div className="flex flex-col gap-4">
//       <h4 className="font-medium">Choose a Quantity</h4>
//       <div className="flex justify-between">
//         <div className="flex items-center gap-4">
//           <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
//             <button
//               className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
//               onClick={() => handleQuantity("d")}
//               disabled={quantity === 1}
//             >
//               -
//             </button>
//             {quantity}
//             <button
//               className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
//               onClick={() => handleQuantity("i")}
//               disabled={quantity === stockNumber}
//             >
//               +
//             </button>
//           </div>
//           {stockNumber < 1 ? (
//             <div className="text-xs">Product is out of stock</div>
//           ) : (
//             <div className="text-xs">
//               Only <span className="text-orange-500">{stockNumber} items</span>{" "}
//               left!
//               <br /> {"Don't"} miss it
//             </div>
//           )}
//         </div>
//         {/* <button
//           onClick={() => addItem(wixClient, productId, variantId, quantity)}
//           // disabled={isLoading}
//           className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
//           style={{ backgroundColor: "blue", color: "white" }}
//         >
//           Add to Cart
//         </button> */}
//         <button
//           type="button"
//           onClick={async () => {
//             try {
//               await addItem(wixClient, productId, variantId, quantity);
//             } catch (error) {
//               console.error("Add to cart failed:", error);
//             }
//           }}
//           disabled={isLoading || stockNumber < 1}
//           className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white"
//           style={{ backgroundColor: "blue", color: "white" }}
//         >
//           {isLoading ? "Adding..." : "Add to Cart"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Add;

"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useState } from "react";

type AddProps = {
  productId: string;
  variantId?: string;
  stockNumber: number;
  isSelectionComplete: boolean;
};

const Add = ({
  productId,
  variantId = "",
  stockNumber,
  isSelectionComplete,
}: AddProps) => {
  const [quantity, setQuantity] = useState(1);

  const wixClient = useWixClient();
  const { addItem, isLoading } = useCartStore();

  const isOutOfStock = stockNumber < 1;

  const handleQuantity = (type: "increase" | "decrease") => {
    if (type === "decrease") {
      setQuantity((current) => Math.max(1, current - 1));
    }

    if (type === "increase") {
      setQuantity((current) =>
        Math.min(stockNumber, current + 1)
      );
    }
  };

  const handleAddToCart = async () => {
    if (!isSelectionComplete) {
      return;
    }

    if (!variantId) {
      console.error("No valid product variant was selected.");
      return;
    }

    if (isLoading || isOutOfStock) {
      return;
    }

    try {
      await addItem(
        wixClient,
        productId,
        variantId,
        quantity
      );
    } catch (error) {
      console.error("Add to cart failed:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex w-32 items-center justify-between rounded-3xl bg-gray-100 px-4 py-2">
            <button
              type="button"
              onClick={() => handleQuantity("decrease")}
              disabled={quantity <= 1 || isLoading}
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() => handleQuantity("increase")}
              disabled={
                quantity >= stockNumber ||
                isLoading ||
                isOutOfStock
              }
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            >
              +
            </button>
          </div>

          {isOutOfStock ? (
            <p className="text-xs text-red-500">
              Product is out of stock
            </p>
          ) : (
            <p className="text-xs">
              Only{" "}
              <span className="text-orange-500">
                {stockNumber} items
              </span>{" "}
              left!
              <br />
              Don&apos;t miss it
            </p>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          {!isSelectionComplete && (
            <p className="text-xs text-red-500">
              Please select all required options.
            </p>
          )}

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={
              isLoading ||
              isOutOfStock ||
              !isSelectionComplete
            }
            className="w-36 rounded-3xl bg-blue-700 px-4 py-2 text-sm text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
          >
            {isLoading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;