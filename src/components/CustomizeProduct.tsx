// "use client";

// import { products } from "@wix/stores";
// import { useEffect, useState } from "react";
// import Add from "./Add";

// const CustomizeProducts = ({
//   productId,
//   variants,
//   productOptions,
// }: {
//   productId: string;
//   variants: products.Variant[];
//   productOptions: products.ProductOption[];
// }) => {
//   const [selectedOptions, setSelectedOptions] = useState<{
//     [key: string]: string;
//   }>({});
//   const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

//   useEffect(() => {
//     const variant = variants.find((v) => {
//       const variantChoices = v.choices;
//       if (!variantChoices) return false;
//       return Object.entries(selectedOptions).every(
//         ([key, value]) => variantChoices[key] === value
//       );
//     });
//     setSelectedVariant(variant);
//   }, [selectedOptions, variants]);

//   const handleOptionSelect = (optionType: string, choice: string) => {
//     setSelectedOptions((prev) => ({ ...prev, [optionType]: choice }));
//   };

//   console.log(selectedOptions);

//   const isVariantInStock = (choices: { [key: string]: string }) => {
//     return variants.some((variant) => {
//       const variantChoices = variant.choices;
//       if (!variantChoices) return false;

//       return (
//         Object.entries(choices).every(
//           ([key, value]) => variantChoices[key] === value
//         ) &&
//         variant.stock?.inStock &&
//         variant.stock?.quantity &&
//         variant.stock?.quantity > 0
//       );
//     });
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       {productOptions.map((option) => (
//         <div className="flex flex-col gap-4" key={option.name}>
//           <h4 className="font-medium">Choose a {option.name}</h4>
//           <ul className="flex items-center gap-3">
//             {option.choices?.map((choice) => {
//               const disabled = !isVariantInStock({
//                 ...selectedOptions,
//                 [option.name!]: choice.description!,
//               });

//               const selected =
//                 selectedOptions[option.name!] === choice.description;

//               const clickHandler = disabled
//                 ? undefined
//                 : () => handleOptionSelect(option.name!, choice.description!);

//               return option.name === "Color" ? (
//                 <li
//                   className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
//                   style={{
//                     backgroundColor: choice.value,
//                     cursor: disabled ? "not-allowed" : "pointer",
//                   }}
//                   onClick={clickHandler}
//                   key={choice.description}
//                 >
//                   {selected && (
//                     <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//                   )}
//                   {disabled && (
//                     <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//                   )}
//                 </li>
//               ) : (
//                 <li
//                   className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm"
//                   style={{
//                     cursor: disabled ? "not-allowed" : "pointer",
//                     backgroundColor: selected
//                       ? "#f35c7a"
//                       : disabled
//                       ? "#FBCFE8"
//                       : "white",
//                     color: selected || disabled ? "white" : "#f35c7a",
//                     boxShadow: disabled ? "none" : "",
//                   }}
//                   key={choice.description}
//                   onClick={clickHandler}
//                 >
//                   {choice.description}
//                 </li>
//               );
//             })}
//           </ul>
//         </div>
//       ))}
//       <Add
//         productId={productId}
//         variantId={
//           selectedVariant?._id || "00000000-0000-0000-0000-000000000000"
//         }
//         stockNumber={selectedVariant?.stock?.quantity || 0}
//       />
//       {/* COLOR */}
//       {/* 
//           <ul className="flex items-center gap-3">
//             <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-red-500">
//               <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//             </li>
//             <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative bg-blue-500"></li>
//             <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative bg-green-500">
//               <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
//             </li>
//           </ul> */}
//       {/* OTHERS */}
//       {/* <h4 className="font-medium">Choose a size</h4>
//       <ul className="flex items-center gap-3">
//         <li className="ring-1 ring-lama text-lama rounded-md py-1 px-4 text-sm cursor-pointer">
//           Small
//         </li>
//         <li className="ring-1 ring-lama text-white bg-lama rounded-md py-1 px-4 text-sm cursor-pointer">
//           Medium
//         </li>
//         <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
//           Large
//         </li>
//       </ul> */}
//     </div>
//   );
// };

// export default CustomizeProducts;

"use client";

import { useMemo, useState } from "react";
import { products } from "@wix/stores";
import Add from "./Add";

type CustomizeProductsProps = {
  productId: string;
  variants: products.Variant[];
  productOptions: products.ProductOption[];
};

const CustomizeProducts = ({
  productId,
  variants,
  productOptions,
}: CustomizeProductsProps) => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionSelect = (
    optionName: string,
    choiceDescription: string
  ) => {
    setSelectedOptions((previousOptions) => ({
      ...previousOptions,
      [optionName]: choiceDescription,
    }));
  };

  // Check that every Wix product option has a selected value
  const isSelectionComplete = useMemo(() => {
    if (!productOptions || productOptions.length === 0) {
      return true;
    }

    return productOptions.every((option) => {
      if (!option.name) {
        return true;
      }

      return Boolean(selectedOptions[option.name]);
    });
  }, [productOptions, selectedOptions]);

  // Find the exact Wix variant matching all selected choices
  const selectedVariant = useMemo(() => {
    if (!variants || variants.length === 0) {
      return undefined;
    }

    if (!isSelectionComplete) {
      return undefined;
    }

    return variants.find((variant) => {
      if (!variant.choices) {
        return false;
      }

      return productOptions.every((option) => {
        if (!option.name) {
          return true;
        }

        return (
          variant.choices?.[option.name] ===
          selectedOptions[option.name]
        );
      });
    });
  }, [
    variants,
    productOptions,
    selectedOptions,
    isSelectionComplete,
  ]);

  const variantId = selectedVariant?._id ?? "";

  const stockNumber =
    selectedVariant?.stock?.quantity ??
      selectedVariant?.stock?.inStock
      ? selectedVariant?.stock?.quantity ?? 100
      : 0;

  const hasValidVariant =
    productOptions.length === 0 ||
    Boolean(selectedVariant);

  const canAddToCart =
    isSelectionComplete && hasValidVariant;

  return (
    <div className="flex flex-col gap-6">
      {productOptions?.map((option) => {
        if (!option.name) {
          return null;
        }

        const optionName = option.name;
        const isColorOption =
          optionName.toLowerCase() === "color" ||
          optionName.toLowerCase() === "colour";

        return (
          <div
            key={optionName}
            className="flex flex-col gap-4"
          >
            <h4 className="font-medium">
              Choose a {optionName}
            </h4>

            <div className="flex flex-wrap gap-3">
              {option.choices?.map((choice) => {
                if (!choice.description) {
                  return null;
                }

                const choiceDescription =
                  choice.description;

                const isSelected =
                  selectedOptions[optionName] ===
                  choiceDescription;

                if (isColorOption) {
                  return (
                    <button
                      key={choiceDescription}
                      type="button"
                      aria-label={`Select ${choiceDescription}`}
                      title={choiceDescription}
                      onClick={() =>
                        handleOptionSelect(
                          optionName,
                          choiceDescription
                        )
                      }
                      className={`h-12 w-12 rounded-full border-4 transition ${isSelected
                          ? "border-blue-400"
                          : "border-gray-200"
                        }`}
                    >
                      <span
                        className="block h-full w-full rounded-full border border-gray-300"
                        style={{
                          backgroundColor:
                            choice.value ||
                            choiceDescription,
                        }}
                      />
                    </button>
                  );
                }

                return (
                  <button
                    key={choiceDescription}
                    type="button"
                    onClick={() =>
                      handleOptionSelect(
                        optionName,
                        choiceDescription
                      )
                    }
                    className={`rounded-lg border px-6 py-2 transition ${isSelected
                        ? "border-blue-400 bg-rose-500 text-white"
                        : "border-blue-300 bg-white text-rose-500 hover:bg-rose-50"
                      }`}
                  >
                    {choiceDescription}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      <Add
        productId={productId}
        variantId={variantId}
        stockNumber={stockNumber}
        isSelectionComplete={canAddToCart}
      />

      {isSelectionComplete &&
        !selectedVariant &&
        variants.length > 0 && (
          <p className="text-sm text-red-500">
            This combination is currently unavailable.
          </p>
        )}
    </div>
  );
};

export default CustomizeProducts;
