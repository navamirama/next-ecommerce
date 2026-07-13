import { wixClientServer } from "@/lib/wixClientServer";
import FilterControls from "./FilterControls";

export type StoreCategory = {
  id: string;
  name: string;
  slug: string;
};

const Filter = async () => {
  try {
    const wixClient = await wixClientServer();

    const collectionResponse =
      await wixClient.collections.queryCollections().find();

    const categories: StoreCategory[] = (
      collectionResponse.items ?? []
    )
      .filter(
        (collection) =>
          collection._id &&
          collection.name &&
          collection.slug
      )
      .map((collection) => ({
        id: collection._id!,
        name: collection.name!,
        slug: collection.slug!,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return <FilterControls categories={categories} />;
  } catch (error) {
    console.error("Unable to load Wix collections:", error);

    return <FilterControls categories={[]} />;
  }
};

export default Filter;