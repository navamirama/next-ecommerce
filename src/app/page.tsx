import CategoryList from "@/components/CategoryList";
import PopupNewsletter from "@/components/PopupNewsletter";
import ProductList from "@/components/ProductList";
import Skeleton from "@/components/Skeleton";
import Slider from "@/components/Slider";

import { Suspense, useContext, useEffect } from "react";

const HomePage = async () => {
  // const wixClient = useContext(WixClientContext);
  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();

  //   };

  //   getProducts();
  // }, [wixClient]);

  // const res = await wixClient.products.queryProducts().find();

  return (
    <div className="">
      <Slider />
      <PopupNewsletter />
      {/* <div className="pt-8 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl bold">Featured Products</h1>
        <Suspense fallback={<Skeleton />}>
          <div className="top-20 pr-6">
            <ProductList
              categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
              limit={8}
            />
          </div>
        </Suspense>
      </div> */}

      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>

      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <Suspense fallback={<Skeleton />}>
          <div className="top-20 pr-6">
            <ProductList
              categoryId={process.env.FEATURED_PRODUCTS_CATEGORY_ID!}
              limit={4}
            />
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
