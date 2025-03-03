import { MetadataRoute } from "next";

import { BASE_URL } from "@/url";
import { ProductType } from "@/types";

export async function generateSitemaps() {
  const data = await getData();
  const productIDs = data.products.map((product) => {
    return { id: product.id };
  });
  return productIDs;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getData();
  return data.products.map(
    (product, index) =>
      index < 50000 && {
        url: `${BASE_URL}/products/${product.id}`,
      }
  ) as MetadataRoute.Sitemap;
}

const getData = async (): Promise<{ products: ProductType[] }> => {
  const response = await fetch(`${BASE_URL}/data.json`);
  return await response.json();
};
