import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { Suspense } from "react";
import { wixClientServer } from "@/lib/wixClientServer";

type ListPageProps = {
  searchParams: {
    cat?: string;
    min?: string;
    max?: string;
    sort?: string;
    page?: string;
  };
};

const ListPage = async ({ searchParams }: ListPageProps) => {
  const wixClient = await wixClientServer();

  const categorySlug = searchParams.cat || "all-products";

  const response =
    await wixClient.collections.getCollectionBySlug(
      categorySlug
    );

  const categoryId =
    response.collection?._id ||
    "00000000-000000-000000-000000000001";

  return (
    <main className="relative px-4 pt-4 md:px-8 md:pt-6 lg:px-16 xl:px-32 2xl:px-64">
      <Filter />

      <h1 className="mt-8 text-xl font-semibold">
        Products for you
      </h1>

      <Suspense fallback={<p className="mt-6">Loading products...</p>}>
        <ProductList
          categoryId={categoryId}
          searchParams={searchParams}
        />
      </Suspense>
    </main>
  );
};

export default ListPage;