import { MetadataRoute } from "next";
import { wixClientServer } from "@/lib/wixClientServer";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.kultstore.co.uk";

  try {
    const wixClient = await wixClientServer();

    const productResult = await wixClient.products
      .queryProducts()
      .limit(100)
      .find();

      const productUrls: MetadataRoute.Sitemap = productResult.items
      .filter((product) => product.slug)
      .map((product) => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }));
      
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      {
        url: `${baseUrl}/list`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
    ];

    return [...staticPages, ...productUrls];
  } catch (error) {
    console.error("Failed to generate sitemap:", error);

    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}