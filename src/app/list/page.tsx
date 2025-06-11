import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import Image from "next/image";
import Link from "next/link";
import { WixClientContext } from "@/context/wixContext";
import { Suspense, useContext } from "react";
import { wixClientServer } from "@/lib/wixClientServer";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  console.log(searchParams);
  const wixClient = await wixClientServer();

  const response = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );
  console.log("I am here");
  console.log(response);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      {/* CAMPAIGN */}
      <div
        className="hidden bg-pink-50 px-4 sm:flex justify-between h-64"
        style={{ backgroundColor: "pink" }}
      >
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on
            <br /> Selected Products
          </h1>
          <button
            className="rounded-3xl bg-lama text-white w-max py-3 px-5 text-sm"
            style={{ backgroundColor: "#ff33d7", color: "white" }}
          >
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>
      {/* FILTER */}
      <Filter />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-xl font-semibold"> Products for you </h1>
      <Suspense fallback={"loading"}>
        <ProductList
          categoryId={
            response.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
    // <div>List Page</div>
  );
};

export default ListPage;
